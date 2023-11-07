import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../common/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401) {
          //unauthorised
          this.authService.logout();
        }
        else if (error.status === 429) {
          //too many requests in a short time span
          this.bruteForceDialog(error);
        }
        else {
          //other error
          this.badRequestDialog(error);
        }
        return throwError(error);
      })
    )
  }

  private addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();

    if (token) {
      return request.clone({
        setHeaders: {
          "x-access-token": token
        }
      })
    }
    return request
  }

  private badRequestDialog(error: HttpErrorResponse) {
    let errorMessage = "An Unknown Error has occurred";
    if (error.error) {
      errorMessage = error.error;
    }
    this.dialog.open(ErrorComponent, {data:{message:errorMessage}});
  }

  private bruteForceDialog(error: HttpErrorResponse) {
    let errorMessage = "Locked out, please wait before attempting again"
    this.dialog.open(ErrorComponent, {data:{message:errorMessage}});
  }
}
