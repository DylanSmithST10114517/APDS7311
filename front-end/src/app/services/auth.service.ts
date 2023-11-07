import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiRequestService: ApiRequestService, private router: Router) { }

  login(username: string, email: string, password: string) {
     this.apiRequestService.login(username, email, password).subscribe((res: HttpResponse<any>) => {
        this.setSession(res.body.userId, res.body.token);
        if (res.status === 200) {
          console.log(res)
          this.router.navigate(['/'])
         }
     });
      
  }

  logout() {
    this.removeSession();

    this.router.navigate(['/login']);
  }

  signup(username: string, email: string, password: string) {
    this.apiRequestService.signup(username, email, password).subscribe((res: HttpResponse<any>) => {
       this.setSession(res.body._id, res.headers.get('x-access-token'));
       if (res.status === 201) {
        console.log("successful sign up")
        this.router.navigate(['/'])
       }
    });
     
 }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }

  private setSession(userId: string, accessToken: any) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
  }
}
