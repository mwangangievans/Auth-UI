import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl, FormGroup } from '@angular/forms';
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
}
