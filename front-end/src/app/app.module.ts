import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostViewComponent } from './pages/post-view/post-view.component';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ApiRequestInterceptor } from './services/api-request.interceptor';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ErrorComponent } from './common/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './pages/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    PostViewComponent,
    NewPostComponent,
    LoginPageComponent,
    SignupPageComponent,
    ErrorComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent, PostViewComponent]
})
export class AppModule { }
