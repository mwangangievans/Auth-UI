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
import { userLoginResponse, userregistrationResponse } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  providers: [ApiService],
  imports: [
    NgIf,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  submit(arg0: number) {
    throw new Error('Method not implemented.');
  }
  forgetPassWordForm!: FormGroup;
  getUserNameForm!: FormGroup;
  veryOtpForm!: FormGroup;
  submitted!: boolean;
  submitted1!: boolean;
  submitted3!: boolean;
  showPassword!: Boolean;
  activetab: 1 | 2 | 3 | 4 | 5 | 6 = 4;
  getUserDetails!: userregistrationResponse;

  ngOnInit() {
    this.forgetPassWordForm = this._formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
    this.getUserNameForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.veryOtpForm = this._formBuilder.group({
      code: ['', Validators.required],
      context: 'RESET',
    });
  }

  constructor(
    private _api: ApiService,
    private _formBuilder: FormBuilder,
    private notify: NotificationService,
    private router: Router
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.forgetPassWordForm);
  }
  get f1(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.getUserNameForm);
  }
  get f3(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.veryOtpForm);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  sentOtp(context: string, position: 1 | 2 | 3) {
    let payload = {
      username: this.getUserDetails.username,
      context: 'LOGIN',
      channel: context,
    };
    if (this.getUserNameForm.valid) {
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
  getUserName(position: 1 | 2 | 3 | 4 | 5 | 6) {
    this.submitted = true;
    if (this.getUserNameForm.valid) {
      this._api
        .post('authentication/register', this.getUserNameForm.value)
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.getUserDetails = data;
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
  veryOtp(position: 1 | 2 | 3 | 4 | 5 | 6) {
    this.submitted3 = true;
    if (this.getUserNameForm.valid) {
      this._api
        .post('authentication/verify-code', this.veryOtpForm.value)
        .subscribe({
          next: (data: any) => {
            if (data) {
              console.log('otp verify.....', data);

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
  resetPasswaord(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.submitted = true;
    if (this.forgetPassWordForm.valid) {
      this._api
        .post('authentication/login', this.forgetPassWordForm.value)
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.notify.showSuccess(`${data.message}`, `Success`);
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
}
