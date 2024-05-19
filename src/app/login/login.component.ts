import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../api.service';
import { NotificationService } from '../notification.service';
import { HttpClientModule } from '@angular/common/http';
import { userLoginResponse } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [ApiService],
  imports: [
    NgIf,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  veryOtpForm!: FormGroup;
  submitted!: Boolean;
  submitted1!: Boolean;

  showPassword!: Boolean;
  loginresponse!: userLoginResponse;
  activetab: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1;

  constructor(
    private _api: ApiService,
    private _formBuilder: FormBuilder,
    private notify: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      client_id: '4884zoy02fxoo9jibgv3qgzb03d1sny2ml5aezt1cuhno9ttlz',
    });

    this.veryOtpForm = this._formBuilder.group({
      code: ['', Validators.required],
      context: 'LOGIN',
    });
  }

  login(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.submitted = true;
    if (this.loginForm.valid) {
      this._api.post('authentication/login', this.loginForm.value).subscribe({
        next: (data: any) => {
          if (data) {
            this.loginresponse = data;
            this.notify.showSuccess(`${data.message}`, `Success`);
            this.activetab = position;
          }
        },
        error: (error) => {
          this._api.loopErrorMessages(error.error);
        },
        complete: () => {},
      });
    } else {
      return;
    }
  }
  veryOtp(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.submitted1 = true;
    if (this.loginForm.valid) {
      this._api
        .post('authentication/verify-code', this.veryOtpForm.value)
        .subscribe({
          next: (data: any) => {
            if (data) {
              console.log('otp verify.....', data);

              this.notify.showSuccess(`${data.message}`, `Success`);
              window.open('https://www.google.com/?authuser=0');
            }
          },
          error: (error) => {
            this._api.loopErrorMessages(error.error);
          },
          complete: () => {},
        });
    } else {
      return;
    }
  }

  sentOtp(context: string, position: 1 | 2 | 3) {
    let payload = {
      username: this.loginresponse.username,
      context: 'LOGIN',
      channel: context,
    };

    if (this.loginForm.valid) {
      this._api.post('authentication/send-code', payload).subscribe({
        next: (data: any) => {
          if (data) {
            console.log('response....', data);
            this.notify.showSuccess(`${data.message}`, `Success`);
            this.activetab = position;
          }
        },
        error: (error) => {
          this._api.loopErrorMessages(error.error);
        },
        complete: () => {},
      });
    } else {
      console.log('else block.....');
    }
  }

  updateActiveTab(position: 1 | 2 | 3 | 4 | 5 | 6) {
    this.activetab = position;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  get f(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.loginForm);
  }
  get f1(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.veryOtpForm);
  }
}
