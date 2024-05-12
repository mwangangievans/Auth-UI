import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';
import { VerifyComponent } from './verify/verify.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: "forget-password", component: ForgotPasswordComponent},
    {path: "otp", component: OtpComponent},
    {path: "otp-verify", component: VerifyComponent},
    {
        path: "**", redirectTo: 'login'
      }
];
