import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  private toastrOptions: Object = {
    // positionClass: 'centered',
    messageClass: 'qm-toast__message',
    easing: 'ease-in-out',
    closeButton: true,
    timeOut: 5000,
  };

  private successOptions: Object = {
    ...this.toastrOptions,
    toastClass: 'toast qm-toast qm-toast--success'
  };

  private errorOptions: Object = {
    ...this.toastrOptions,
    toastClass: 'toast qm-toast qm-toast--danger'
  };

  private infiniteOptions: Object = {
    ...this.toastrOptions,
    toastClass: 'toast qm-toast qm-toast--danger',
    closeButton: false,
    tapToDismiss: false,
    disableTimeOut: true
  };

  private htmlSuccessOptions: Object = {
    ...this.toastrOptions,
    toastClass: 'toast qm-toast qm-toast--success',
    enableHtml: true
  };

  setToastContainer (toastContainer) {
    this.toastrService.overlayContainer = toastContainer;
    if(['overlay']['_paneElements']) {
      this.toastrService['overlay']['_paneElements'] = {};
    }
    
  }

  successToast(text: string) {
    return this.toastrService.success(text, '', this.successOptions);
  }

  errorToast(text: string) {
    this.toastrService.error(text, '', this.errorOptions);
  }

  htmlSuccessToast(text: string) {
    this.toastrService.success(text, '', this.htmlSuccessOptions);
  }

  // Create toast that does not expire
  infiniteToast(text: string) {
    this.toastrService.error(text, '', this.infiniteOptions);
  }

  clearToasts () {
    this.toastrService.toasts
      .map(toast => this.toastrService.clear(toast.toastId));
  }

  constructor(private toastrService: ToastrService) { }
}
