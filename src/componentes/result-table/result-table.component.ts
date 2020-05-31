import { Component, OnInit } from '@angular/core';
import { VkApiService } from "@services/vk-api.service";
import { Topic } from '@root/entities/Topic';
import { User } from '@root/entities/User';
import { forkJoin } from 'rxjs';
import { Comment } from '@entities/Comment';
import { ResultTableModel } from './ResultTableModel';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  private readonly vkApiService: VkApiService;
  private readonly route: ActivatedRoute;
  private readonly cookieService: CookieService;
  private readonly screenName: string;

  private topics: Topic[] = [];
  private members: User[] = [];
  private groupId: number = 148973127; //пока хардкорд

  public model: ResultTableModel;

  constructor(vkApiService: VkApiService, route: ActivatedRoute, cookieService: CookieService) {
    this.vkApiService = vkApiService;
    this.route = route;
    this.cookieService = cookieService;
    this.screenName = this.route.snapshot.paramMap.get('screenName');
  }

  async getGroupId(): Promise<number> {
    let self = this;
    let cookieName = `CouchHelper.${self.screenName}`;
    //if groupId was found in cookies then return value and set cookies via groupId
    let isCookieExists: boolean = self.cookieService.check(cookieName);
    let cookieObject: object = {};
    if (isCookieExists) {
      cookieObject = JSON.parse(self.cookieService.get(cookieName));
    }

    if (cookieObject['groupId']) {
      return Promise.resolve(parseInt(cookieObject['groupId']));

    }
    else {  //else get groupId from url link parameter aka screen_name https://vk.com/dev/utils.resolveScreenName
      let groupIdFromVk: number;
      let data = await self.vkApiService.resolveScreenName(self.screenName).toPromise();
      if (data) {
        groupIdFromVk = data.response.object_id;
        //set cookies for group
        self.cookieService.set(cookieName, JSON.stringify(Object.assign(cookieObject, { groupId: groupIdFromVk })));

        return Promise.resolve(groupIdFromVk);
      }
      else console.log('GroupId by screen_name wasn`t found');
    }
  }

  async ngOnInit() {

    let self = this;
    self.groupId = await this.getGroupId();

    let observableGetTopicByGroup = self.vkApiService.getTopicsByGroup(self.groupId);
    let observableGetMembersByGroup = self.vkApiService.getMembersByGroup(self.groupId);

    forkJoin([observableGetTopicByGroup, observableGetMembersByGroup]).subscribe({
      next: (data) => {
        self.topics = data[0].response.items as Topic[];
        self.topics.forEach(t => t.relativeUrl = `topic-${this.groupId}_${t.id}`);

        self.members = data[1].response.items as User[];

        if (self.topics.length) {
          forkJoin(self.topics.map(t => self.vkApiService.getCommentsByTopic(t.id, self.groupId))).subscribe({
            next: (data) => {
              self.topics.forEach((t, i) => t.comments_entities = data[i].response.items as Comment[])
            },
            error: (err) => console.log(err),
            complete: () => self.fillModel()
          });
        }

      },
      error: (err) => console.log(err)
    });

  }

  isTopicIncludesMember(topic: Topic, member: User): boolean {
    return topic.comments_entities.map(t => t.from_id).includes(member.id);
  }

  getPostId(topic: Topic, member: User, groupId: number): number {
    return topic.comments_entities.filter(c => c.from_id == member.id)[0].id;
  }

  fillModel(): void {
    this.model = { topics: this.topics, members: this.members, groupId: this.groupId };
  }

}
