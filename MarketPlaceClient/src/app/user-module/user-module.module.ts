import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { UserVerificationGuard } from '../guards/user-verification.guard';
import { UserNavComponent } from './user-nav/user-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { PostcreateComponent } from '../postcreate/postcreate.component';
import { ProfileupdateComponent } from '../profileupdate/profileupdate.component';
import { PostupdateComponent } from '../postupdate/postupdate.component';
import { PostsComponent } from '../posts/posts.component';
import { PostsDetailComponent } from '../posts/posts.details.component';
import { LogoutComponent } from '../admin-module/logout/logout.component';
import { UserComponentsGuard } from '../guards/user-components.guard';
import { AuthInterceptor } from '../interceptors/AuthInterceptor';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'user', component: UserNavComponent, canActivate: [UserComponentsGuard] },
      {
        path: 'user', component: UserNavComponent, canActivate: [UserComponentsGuard],
        children: [
          { path: 'postcreate', component: PostcreateComponent },
          { path: 'posts', component: PostsComponent },
          { path: 'profile', component: ProfileupdateComponent },
          { path: 'logout', component: LogoutComponent }
        ]
      },
      { path: 'posts/:id', component: PostsDetailComponent },
      { path: 'postupdate/:id', component: PostupdateComponent, canActivate: [UserComponentsGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login/forgetPassword', component: ForgetPasswordComponent },
      { path: 'verifyUser', component: VerifyUserComponent, canActivate: [UserVerificationGuard] }
    ]),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [LoginComponent, RegisterComponent, ForgetPasswordComponent, VerifyUserComponent, UserNavComponent]
  ,
  bootstrap: [UserNavComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }]
})
export class UserModuleModule { }
