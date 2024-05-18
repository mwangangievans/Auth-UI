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
  submitted!: Boolean;
  showPassword!: Boolean;

  constructor(
    private _api: ApiService,
    private _formBuilder: FormBuilder,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      client_id: '4884zoy02fxoo9jibgv3qgzb03d1sny2ml5aezt1cuhno9ttlz',
    });
  }

  login(position: 1 | 2 | 3 | 4 | 5 | 6 | 7) {
    // {
    //   "client_id": "string",
    //   "username": "string",
    //   "password": "string"
    // }

    this.submitted = true;
    if (this.loginForm.valid) {
      this._api.post('authentication/login', this.loginForm.value).subscribe({
        next: (data: any) => {
          if (data) {
            this.notify.showSuccess(`${data.message}`, `Success`);
            this.activetab = position;
          }
        },
        error: (error) => {
          for (let key in error) {
            if (error.hasOwnProperty(key)) {
              this.notify.showError(`${error[key]}`, `Errro`);
            }
          }
        },
        complete: () => {},
      });
    } else {
      return;
    }
  }

  resentOtp(arg0: number) {
    throw new Error('Method not implemented.');
  }
  activetab: 1 | 2 | 3 | 4 | 5 | 6 | 7 = 1;

  updateActiveTab(position: 1 | 2 | 3 | 4 | 5 | 6) {
    this.activetab = position;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  get f(): { [key: string]: AbstractControl } {
    return this._api.getFormControls(this.loginForm);
  }
}
