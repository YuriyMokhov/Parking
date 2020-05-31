import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Topic } from "@entities/Topic";
import { AuthService } from "@services/auth.service";
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VkApiService {
  private http: HttpClient;
  private authService: AuthService;
  private token: string;
  private groupId: number;

  constructor(http: HttpClient, authService: AuthService) {
    this.http = http;
    this.authService = authService;
    this.token = this.authService.getAccessToken();
  }

  getTopicsByGroup(groupId: number): Observable<any> {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/board.getTopics?group_id=${groupId}&v=5.52&access_token=${this.token}`, 'callback')
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
    return result;
  }

  getGroupById(groupId: number): Observable<any> {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/groups.getById?group_id=${groupId}&fields=id,name,contacts&v=5.52&access_token=${this.token}`, 'callback')
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
    return result;
  }
  getUserInfoById(userId: number): Observable<any> {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=id,first_name,last_name,photo_50&v=5.52&access_token=${this.token}`, 'callback')
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
    return result;
  }

  getMembersByGroup(groupId: number): Observable<any> {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/groups.getMembers?group_id=${groupId}&fields=domain,photo_50&v=5.52&access_token=${this.token}`, 'callback')
      .pipe(
        catchError((error) => {
          console.log(error);
          throw error;
        })
      );
    return result;
  }


  getCommentsByTopic(topicId: number, groupId: number): Observable<any> {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/board.getComments?topic_id=${topicId}&group_id=${groupId}&v=5.52&access_token=${this.token}`, 'callback');
    return result;
  }

  resolveScreenName(screen_name: string) {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/utils.resolveScreenName?screen_name=${screen_name}&v=5.52&access_token=${this.token}`, 'callback');
    return result;
  }
}
