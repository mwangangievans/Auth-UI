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

@Component({
  selector: 'app-register-form',
  standalone: true,
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
  imports: [
    NgIf,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [ApiService],
})
export class RegisterFormComponent {
  activetab: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 2;
  registerForm!: FormGroup;
  submitted!: boolean;
  showPassword!: boolean;
  isDialogOpen!: boolean;

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
      phone_number: ['', Validators.required],
      fullname: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.submitted = true;
    if (this.registerForm.valid) {
      this._api
        .post('authentication/register', this.registerForm.value)
        .subscribe({
          next: (data: any) => {
            if (data) {
              console.log('response....', data);

              this.notify.showSuccess(`${data.error?.detail}`, `Success`);
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

  resentOtp(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    this.activetab = position;
    // let payload = {
    //   username: this.registerForm.value.phone_number,
    //   context: 'REGISTRATION',
    // };
    // if (this.registerForm.valid) {
    //   this._api.post('authentication/send-code', payload).subscribe({
    //     next: (data: any) => {
    //       if (data) {
    //         console.log('response....', data);

    //         this.notify.showSuccess(`${data.error?.detail}`, `Success`);
    //       }
    //     },
    //     error: (error) => {
    //       this._api.loopErrorMessages(error.error);
    //     },
    //     complete: () => {},
    //   });
    // } else {
    //   return;
    // }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
