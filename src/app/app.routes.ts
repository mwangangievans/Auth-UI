import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: "forget-password", component: ForgotPasswordComponent},
    {path: "opt", component: ForgotPasswordComponent},
    {path: "otp-verify", component: ForgotPasswordComponent},
    {
        path: "**", redirectTo: 'login'
      }
];
