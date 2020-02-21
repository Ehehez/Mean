import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccesodbService {

  constructor(private http: HttpClient) { }

  postPost(payload) {
    return this.http.post('http://localhost:3000/post', payload);
  }

  getUsersByFilter(field, value) {
    return this.http.get('http://localhost:3000/users/search/' + field + "/" + value);
  }

  getProfile() {
    return this.http.get('http://localhost:3000/users/me');
  }

  setFollow(id) {
    let payload = {
      _id: id
    }
    return this.http.post('http://localhost:3000/users/follow', payload)
  }

  unsetFollow(id) {
    let payload = {
      _id: id
    }
    return this.http.post('http://localhost:3000/users/unfollow', payload)
  }

  getPosts() {
    return this.http.get('http://localhost:3000/post');
  }

  getFollowedPosts() {
    return this.http.get('http://localhost:3000/post/followed')
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  logout() {
    return this.http.post('http://localhost:3000/users/me/logoutall', null)
  }

  getRatings() {
    return this.http.get('http://localhost:3000/rating')
  }

  setRatings(payload) {
    return this.http.post('http://localhost:3000/rating', payload);
  }

  setComment(payload) {
    return this.http.post('http://localhost:3000/post/comment', payload);
  }

  populate(id) {
    return this.http.post('http://localhost:3000/post/populate', { post: id });
  }
}
