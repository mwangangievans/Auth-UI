import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { OtpComponent } from './otp/otp.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    LoginComponent,
    CommonModule,
    ForgotPasswordComponent,
    RegisterComponent,
    VerifyComponent,
    OtpComponent,
    LoaderComponent,
  ],
})
export class AppComponent {
  title = 'AUTH';
}
