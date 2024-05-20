import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { NotificationService } from './notification.service';

const baseUrl = 'http://api-auth.kimipay.com/';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private location: Location,
    private http: HttpClient,
    private notify: NotificationService
  ) {}

  goBack(): void {
    this.location.back();
  }

  get(route: string, payload?: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}${route}${payload}`);
  }

  getWithNoToken(route: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}${route}`);
  }

  post(route: string, payload?: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}${route}`, payload);
  }
  postWithNoToken(route: string, payload?: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}${route}`, payload);
  }

  getFormControls(formGroup: FormGroup): { [key: string]: AbstractControl } {
    return formGroup.controls;
  }
  loopErrorMessages(error: any) {
    for (let key in error) {
      if (error.hasOwnProperty(key)) {
        this.notify.showError(`${error[key]}`, `Errro`);
      }
    }
  }
  kenyanPhoneNumberValidator(): ValidatorFn {
    // Regular expression for Kenyan phone numbers

    const KENYA_PHONE_REGEX = /^(\+?254|0)?[7][0-9]{8}$/;

    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = KENYA_PHONE_REGEX.test(control.value);
      return valid
        ? null
        : { invalidKenyanPhoneNumber: { value: control.value } };
    };
  }

  maskPhoneNumber(phoneNumber: string) {
    const visibleStart = '+254';
    const visibleEnd = phoneNumber.slice(-3);
    const maskedMiddle = '*'.repeat(
      phoneNumber.length - visibleStart.length - visibleEnd.length
    );

    const maskedPhoneNumber = visibleStart + maskedMiddle + visibleEnd;

    return maskedPhoneNumber;
  }
  maskEmailAddress(email: string) {
    // Split the email into the local part and the domain part
    const [localPart, domain] = email.split('@');

    // No need to mask if the local part has two characters or less
    if (localPart.length <= 2) {
      return email;
    }

    // Keep the first character, mask the middle characters, and keep the last character
    const firstChar = localPart[0];
    const lastChar = localPart[localPart.length - 1];
    const maskedChars = '*'.repeat(localPart.length - 2);

    // Combine the masked local part with the domain
    const maskedLocalPart = `${firstChar}${maskedChars}${lastChar}`;
    const maskedEmail = `${maskedLocalPart}@${domain}`;

    return maskedEmail;
  }
}
