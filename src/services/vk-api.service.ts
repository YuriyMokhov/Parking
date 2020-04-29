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

  constructor(http: HttpClient, authService: AuthService) {
    this.http = http;
    this.authService = authService;
  }

  getTopicsByGroup(): Observable<Topic[]> {
    let token: string = this.authService.getAccessToken();
    return this.http.get<Topic[]>(`https://api.vk.com/method/board.getTopics?group_id=148973127&v=5.52&access_token=${token}`)
    // .pipe(
    //   catchError((error, caught) => {
    //     console.log(error);
    //     throw error;
    //   })
    // );
  }
}
