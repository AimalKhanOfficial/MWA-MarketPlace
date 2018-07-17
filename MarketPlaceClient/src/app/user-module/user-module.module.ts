import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { UserVerificationGuard } from '../guards/user-verification.guard';
import { UserNavComponent } from './user-nav/user-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { PostcreateComponent } from '../postcreate/postcreate.component';
import { PostupdateComponent } from '../postupdate/postupdate.component';
import { PostsComponent } from '../posts/posts.component';
import { PostsDetailComponent } from '../posts/posts.details.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'user', component: UserNavComponent },
      {
        path: 'user', component: UserNavComponent,
        children: [
          { path: 'postcreate', component: PostcreateComponent },
          { path: 'posts', component: PostsComponent }
        ]
      },

      { path: 'posts/:id', component: PostsDetailComponent },
      { path: 'postupdate/:id', component: PostupdateComponent },
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
  bootstrap: [UserNavComponent]
})
export class UserModuleModule { }
