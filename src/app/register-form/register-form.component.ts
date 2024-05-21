import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ApiService } from '../api.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../notification.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader/loader.component';
import { userregistrationResponse } from '../model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  providers: [ApiService],
  imports: [
    NgIf,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LoaderComponent,
    RouterModule,
  ],
})
export class RegisterFormComponent {
  activetab: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1;
  registerForm!: FormGroup;
  veryOtpForm!: FormGroup;
  submitted!: boolean;
  showPassword!: boolean;
  isDialogOpen!: boolean;
  registrationresponse!: userregistrationResponse;
  submitted1!: boolean;

  updateActiveTab(position: 1 | 2 | 3 | 4 | 5 | 6) {
    this.activetab = position;
  }

  constructor(
    private _api: ApiService,
    private _formBuilder: FormBuilder,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone_number: [
        '',
        [Validators.required, this._api.kenyanPhoneNumberValidator()],
      ],
      fullname: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.veryOtpForm = this._formBuilder.group({
      code: ['', Validators.required],
      context: 'REGISTRATION',
    });
  }
  veryOtp(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.submitted1 = true;
    if (this.registerForm.valid) {
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

  register(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.submitted = true;
    if (this.registerForm.valid) {
      this._api
        .post('authentication/register', this.registerForm.value)
        .subscribe({
          next: (data: any) => {
            if (data) {
              this.registrationresponse = data;
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

  get f(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.registerForm);
  }
  get f1(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.veryOtpForm);
  }

  sentOtp(context: string, position: 1 | 2 | 3) {
    console.log({ context });
    console.log('form.....', this.registerForm);

    let payload = {
      username: this.registrationresponse.username,
      context: 'REGISTRATION',
      channel: context,
    };

    if (this.registerForm.valid) {
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
