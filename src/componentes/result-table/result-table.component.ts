import { Component, OnInit } from '@angular/core';
import { VkApiService } from "@services/vk-api.service";
import { Topic } from '@root/entities/Topic';
import { User } from '@root/entities/User';
import { forkJoin } from 'rxjs';
import { Comment } from '@entities/Comment';
import { ResultTableModel } from './ResultTableModel';


@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  private vkApiService: VkApiService;
  private topics: Topic[] = [];
  private members: User[] = [];
  private groupId: number = 148973127; //пока хардкорд

  public model: ResultTableModel;

  constructor(vkApiService: VkApiService) {
    this.vkApiService = vkApiService;
  }

  ngOnInit() {
    let self = this;
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


    })

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
