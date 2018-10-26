import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PRINT_CONFIRM_PAGE, BOOKING_HOME_URL } from './url-helper';

@Injectable()
export class NavigationService {

  constructor(private router: Router) { }

  goToPrintConfirmPage() {
    this.router.navigateByUrl(PRINT_CONFIRM_PAGE);
  }

  goToHome() {
    this.router.navigateByUrl(BOOKING_HOME_URL);
  }
}
