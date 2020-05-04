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

  constructor(http: HttpClient, authService: AuthService) {
    this.http = http;
    this.authService = authService;
    this.token = this.authService.getAccessToken();
  }

  getTopicsByGroup(): Observable<any> {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/board.getTopics?group_id=148973127&v=5.52&access_token=${this.token}`, 'callback')
      .pipe(
        catchError((error, caught) => {
          console.log(error);
          throw error;
        })
      );
    return result;
  }

  getUserInfoById(userId: number): Observable<any> {
    let result = this.http.jsonp<any>(`https://api.vk.com/method/users.get?user_ids=${userId}&fields=id,first_name,last_name,photo_50&v=5.52&access_token=${this.token}`, 'callback')
      .pipe(
        catchError((error, caught) => {
          console.log(error);
          throw error;
        })
      );
    return result;
  }
}
