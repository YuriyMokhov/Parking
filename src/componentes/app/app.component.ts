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
    this.vkApiService.getTopicsByGroup().subscribe(topics => {

      this.topics = topics
    });
  }

}
