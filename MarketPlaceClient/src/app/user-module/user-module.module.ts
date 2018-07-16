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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login/forgetPassword', component: ForgetPasswordComponent },
      { path: 'verifyUser', component: VerifyUserComponent, canActivate: [UserVerificationGuard] }
    ])
  ],
  declarations: [LoginComponent, RegisterComponent, ForgetPasswordComponent, VerifyUserComponent]
})
export class UserModuleModule { }
