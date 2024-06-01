import { Injectable } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  showSuccess(message: any, title: string) {
    // this.toastr.success(message, title, { timeOut: 5000 })

    Notify.success(`${message}` ?? `${title}`, {
      width: '500px',
      pauseOnHover: true,
      position: 'center-top',
      showOnlyTheLastOne: true,
      timeout: 5000,
    });
  }

  showError(message: any, title: string) {
    // this.toastr.error(message, title, { timeOut: 5000 })

    Notify.failure(`${message}` ?? `${title}`, {
      width: '500px',
      pauseOnHover: true,
      position: 'center-top',
      showOnlyTheLastOne: true,
      timeout: 3000,
    });
  }

  showInfo(message: any, title: string) {
    Notify.info(`${message}` ?? `${title}`, {
      width: '500px',
      pauseOnHover: true,
      position: 'center-top',
      showOnlyTheLastOne: true,
      timeout: 5000,
    });
    //  warning
    // this.toastr.info(message, title, { timeOut: 5000 })
  }

  showWarning(message: any, title: string) {
    // this.toastr.warning(message, title, { timeOut: 5000 })

    Notify.warning(`${message}` ?? `${title}`, {
      width: '500px',
      pauseOnHover: true,
      position: 'center-top',
      showOnlyTheLastOne: true,
      timeout: 5000,
    });
  }
}
