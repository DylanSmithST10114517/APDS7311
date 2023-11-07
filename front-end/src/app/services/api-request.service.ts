import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'https://localhost:3000/api'
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, body: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, body);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(username: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/user/login`, {
      username,
      email,
      password
    }, {
      observe: "response"
    });
  }

  signup(username: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/user/register`, {
      username,
      email,
      password
    }, {
      observe: "response"
    });
  }
}
