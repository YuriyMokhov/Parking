import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;
  //  private appId: number = 7437657;
  //  private apiUrl: string = `https://oauth.vk.com/authorize?client_id=${this.appId}&scope=notifications,offline&display=page&response_type=token&redirect_uri=https://oauth.vk.com/blank.html`;
  private authToken = "67226852b426f13af9be3a61fcf5da4a262774a76f27134d1628ebb0642e2501756bdb864c1b5c93bde6b";
  constructor(http: HttpClient) {
    this.http = http;
  }

  getAccessToken(): string {

    return this.authToken;
  }
}
