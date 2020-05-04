import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { VkApiService } from "@services/vk-api.service";
import { Topic } from "@entities/Topic";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private authService: AuthService;
  private vkApiService: VkApiService;
  topics: Topic[];

  authToken: string;
  constructor(authService: AuthService, vkApiService: VkApiService) {
    this.authService = authService;
    this.vkApiService = vkApiService;
  }

  ngOnInit() {
    // this.authToken = this.authService.getAccessToken();
    let self = this;
    self.vkApiService.getTopicsByGroup().subscribe(data => {
      self.topics = data.response.items;

      self.topics.forEach(topic => {
        self.vkApiService.getUserInfoById(topic.created_by)
          .subscribe(user => {
            console.log(user.response[0]);
            topic.created_by_user = user.response[0]
          }
          );
      });

    });


  }

}
