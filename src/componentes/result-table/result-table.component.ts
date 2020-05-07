import { Component, OnInit } from '@angular/core';
import { VkApiService } from "@services/vk-api.service";
import { Topic } from '@root/entities/Topic';
import { User } from '@root/entities/User';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {
  // listOfData = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32
  //   }
  // ];

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
    let observableGetTopicByGroup = self.vkApiService.getTopicsByGroup(this.groupId);
    let observableGetMembersByGroup = self.vkApiService.getMembersByGroup(this.groupId);

    forkJoin([observableGetTopicByGroup, observableGetMembersByGroup]).subscribe({
      next: (data) => {
        self.topics = data[0].response.items as Topic[];
        self.members = data[1].response.items as User[];
      },
      error: (err) => console.log(err),
      complete: () => self.fillModel()
    })
    // self.vkApiService.getTopicsByGroup(this.groupId).subscribe(data => {
    //   self.topics = data.response.items;

    //   self.vkApiService.getMembersByGroup(this.groupId).subscribe(data => {
    //     self.members = data.response.items as User[];
    //     console.log(self.members);

    //     this.fillModel();
    //   });

    //   self.vkApiService.getMembersByGroup(this.groupId).subscribe({
    //     next: (data) => {
    //       self.members = data.response.items as User[];
    //       console.log(self.members);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }

    //   });

    //   //Разобраться как собрать несколько тасков и заполнять таблицу после выполнения каждого из них!!!
    // });





    //получаем топики board.getTopics
    //получаем юзеров в сообществе groups.getMembers 
    //получаем какие юзеры имеют сообщения в топиках board.getComments

  }

  fillModel(): void {
    this.model = {
      headers: [""].concat(this.topics.map(t => t.title)),
      rows: this.members.map(member => (new Array<any>(member.photo_50)).concat(true, false, true, true, false, true))
      // rows: [
      //   ["User1", true, false, true, true, false, true],
      //   ["User2", true, true, false, true, false, true],
      //   ["User3", false, false, true, true, false, true]
      // ]
    }
  }

}
