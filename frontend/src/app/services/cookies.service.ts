import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private http: HttpClient) { }

  postPage() {

  }

  getPage() {
    return this.http.get('http://localhost:3000/page/cookies');
  }

  getPageWarning() {
    return this.http.get('http://localhost:3000/page/warning');
  }
}
