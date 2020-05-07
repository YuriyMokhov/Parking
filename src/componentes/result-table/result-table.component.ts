import { Component, OnInit } from '@angular/core';
import { VkApiService } from "@services/vk-api.service";
import { Topic } from '@root/entities/Topic';
import { User } from '@root/entities/User';
import { forkJoin } from 'rxjs';
import { Comment } from '@entities/Comment';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  private vkApiService: VkApiService;
  private topics: Topic[] = [];
  members: User[] = [];
  public model: any = null;
  private groupId: number = 148973127; //пока хардкорд
  private isLoaded: boolean = false;

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

  fillModel(): void {
    this.model = {
      headers: ([""] as Array<any>).concat(this.topics),
      rows: this.members.map(member => {
        return ([member] as Array<any>).concat(this.topics.map(topic => {
          return topic.comments_entities.map(c => { return c.from_id; }).includes(member.id);
        }));
      })
    };

    console.log(this.model);
  }

}
