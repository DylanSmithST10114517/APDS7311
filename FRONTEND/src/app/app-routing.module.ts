import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { PostViewComponent } from './pages/post-view/post-view.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  { path: '', component: PostViewComponent },
  { path: 'new-post', component: NewPostComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
