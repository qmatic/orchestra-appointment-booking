import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgOption } from '@ng-select/ng-select';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { ICustomer } from '../../../../models/ICustomer';
import { CustomerDispatchers, UserSelectors, CustomerSelectors } from '../../../../store';

@Component({
  selector: 'qm-update-customer-modal',
  templateUrl: './qm-update-customer-modal.component.html',
  styleUrls: ['./qm-update-customer-modal.component.scss']
})
export class QmUpdateCustomerModalComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private userDirection$: Observable<string>;
  private currentCustomer$: Observable<ICustomer>;
  private updateCustomerForm: FormGroup;

  private currentCustomer: ICustomer;

  private dateLabelKeys: string[] = [
    'label.january',
    'label.february',
    'label.march',
    'label.april',
    'label.may',
    'label.june',
    'label.july',
    'label.august',
    'label.september',
    'label.october',
    'label.november',
    'label.december'
  ];

  private months: NgOption[];

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private customerSelectors: CustomerSelectors,
    private customerDispatchers: CustomerDispatchers,
    private userSelectors: UserSelectors,
    private translateService: TranslateService
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
  }

  ngOnInit() {
    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (currentCustomer: ICustomer) => {
        this.currentCustomer = currentCustomer;
        this.buildUserForm();
      }
    );

    const translateSubscription = this.translateService.get(this.dateLabelKeys).subscribe(
      (dateLabels: string[]) => {
        this.months = [
          { value: '01', label: dateLabels['label.january'] },
          { value: '02', label: dateLabels['label.february'] },
          { value: '03', label: dateLabels['label.march'] },
          { value: '04', label: dateLabels['label.april'] },
          { value: '05', label: dateLabels['label.may'] },
          { value: '06', label: dateLabels['label.june'] },
          { value: '07', label: dateLabels['label.july'] },
          { value: '08', label: dateLabels['label.august'] },
          { value: '09', label: dateLabels['label.september'] },
          { value: '10', label: dateLabels['label.october'] },
          { value: '11', label: dateLabels['label.november'] },
          { value: '12', label: dateLabels['label.december'] },
        ];
      }
    );

    this.subscriptions.add(currentCustomerSubscription);
    this.subscriptions.add(translateSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  buildUserForm() {
    let date = {
      day: '',
      month: '',
      year: ''
    };

    if (this.currentCustomer.dateOfBirth) {
      const dob: any = this.currentCustomer.dateOfBirth;
      const dobDate = new Date(dob);
      const test = dobDate.getMonth();
      date = this.formatDate(
              dobDate.getDate(),
              dobDate.getMonth(),
              dobDate.getFullYear());
    }

    this.updateCustomerForm = this.fb.group({
      firstName: [ this.currentCustomer.firstName, Validators.required ],
      lastName: [ this.currentCustomer.lastName, Validators.required ],
      email: [ this.currentCustomer.email, [Validators.required, Validators.email]],
      phone: [ this.currentCustomer.phone, [Validators.required, Validators.pattern(/[0-9\-\+\s\(\)\.]/)]],
      dateOfBirth: this.fb.group({
        month: date.month ? date.month : null,
        day: [date.day ? date.day : '', [Validators.max(31), Validators.minLength(2), Validators.maxLength(2)]],
        year: [date.year ? date.year : '', [Validators.minLength(4), Validators.maxLength(4)]]
      })
    });
  }

  onSubmit() {
    const customer: ICustomer = this.prepareUpdateCustomer();
    this.customerDispatchers.updateCustomer(customer);
    this.activeModal.close();
  }

  prepareUpdateCustomer(): ICustomer {
    const formModel = this.updateCustomerForm.value;

    const customerToSave: ICustomer = {
      id: this.currentCustomer.id,
      firstName: formModel.firstName as string,
      lastName: formModel.lastName as string,
      name: formModel.firstName as string + ' ' + formModel.lastName as string,
      email: formModel.email as string,
      phone: formModel.phone as string,
      dateOfBirth: this.getDateOfBirth()
    };

    return customerToSave;
  }

  getDateOfBirth(): string {
    const formModel = this.updateCustomerForm.value;
    const year = formModel.dateOfBirth.year as string;
    const month = formModel.dateOfBirth.month as string;
    let day = formModel.dateOfBirth.day as string;

    if (day && parseInt(day, 10)) {
      const intDay = parseInt(day, 10);
      if (intDay < 10) {
        day = '0' + intDay;
      }
    }

    return year && month && day
          ? year + '-' + month + '-' + day
          : '';
  }

  formatDate(day, month, year) {
    let newDay, newMonth;
    if (day !== '' || day !== undefined) {
      const intDay = parseInt(day, 10);
      if (intDay < 10) {
        newDay = '0' + intDay;
      }
    }

    if (month !== '' || month !== undefined) {
      const intMonth = parseInt(month, 10) + 1;
      if (intMonth < 10) {
        newMonth = '0' + intMonth;
      }
    }

    return {
      day: newDay,
      month: newMonth,
      year: year
    };
  }

  get firstName() { return this.updateCustomerForm.get('firstName'); }
  get lastName() { return this.updateCustomerForm.get('lastName'); }
  get email() { return this.updateCustomerForm.get('email'); }
  get phone() { return this.updateCustomerForm.get('phone'); }
  get day() { return this.updateCustomerForm.get('dateOfBirth').get('day'); }
  get month() { return this.updateCustomerForm.get('dateOfBirth').get('month'); }
  get year() { return this.updateCustomerForm.get('dateOfBirth').get('year'); }
}
