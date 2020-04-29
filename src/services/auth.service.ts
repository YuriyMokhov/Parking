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
  private authToken = "57fbe42b04bc5693fd3b14b670655690aef72568b952e2777303276ee16acebf763ff3b552a706c21cd8f";
  constructor(http: HttpClient) {
    this.http = http;
  }

  getAccessToken(): string {

    return this.authToken;
  }
}
