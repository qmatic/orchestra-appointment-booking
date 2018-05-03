import { Setting } from './../../../../models/Setting';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOption } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { ICustomer } from '../../../../models/ICustomer';
import { CustomerDispatchers, UserSelectors, SettingsAdminSelectors } from '../../../../store';

@Component({
  selector: 'qm-create-customer-modal',
  templateUrl: './qm-create-customer-modal.component.html',
  styleUrls: ['./qm-create-customer-modal.component.scss']
})
export class QmCreateCustomerModalComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private userDirection$: Observable<string>;
  private createCustomerForm: FormGroup;
  private settingsMap$: Observable<{ [name: string]: Setting }>;

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
    private customerDispatchers: CustomerDispatchers,
    private userSelectors: UserSelectors,
    private translateService: TranslateService,
    private settingAdminSelectors: SettingsAdminSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = settingAdminSelectors.settingsAsMap$;
    this.buildCustomerForm();
  }

  ngOnInit() {
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

    this.subscriptions.add(translateSubscription);

    this.settingsMap$.subscribe((x) => {
      console.log(x);
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  buildCustomerForm() {


    this.settingsMap$.subscribe(settings => {
      const phoneValidators = [Validators.pattern(/[0-9\-\+\s\(\)\.]/)];
      if (settings.CustomerPhoneRequired.value === true) {
        phoneValidators.push(Validators.required);
      }

      this.createCustomerForm = this.fb.group({
        firstName: [ '', Validators.required ],
        lastName: [ '', Validators.required ],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', phoneValidators],
        dateOfBirth: this.fb.group({
          month: null,
          day: ['', [Validators.max(31), Validators.minLength(2), Validators.maxLength(2)]],
          year: ['', [Validators.minLength(4), Validators.maxLength(4)]]
        })
      });
    });
  }

  onSubmit() {
    const customer: ICustomer = this.prepareSaveCustomer();
    this.customerDispatchers.createCustomer(customer);
    this.activeModal.close();
  }

  prepareSaveCustomer(): ICustomer {
    const formModel = this.createCustomerForm.value;

    const customerToSave: ICustomer = {
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
    const formModel = this.createCustomerForm.value;
    const year = formModel.dateOfBirth.year as string;
    const month = formModel.dateOfBirth.month as string;
    let day = formModel.dateOfBirth.day as string;

    if (day && parseInt(day, 10)) {
      const intDay = parseInt(day, 10);
      if (intDay < 10) {
        day = '0' + day;
      }
    }

    return year && month && day
          ? year + '-' + month + '-' + day
          : '';
  }

  get firstName() { return this.createCustomerForm.get('firstName'); }
  get lastName() { return this.createCustomerForm.get('lastName'); }
  get email() { return this.createCustomerForm.get('email'); }
  get phone() { return this.createCustomerForm.get('phone'); }
  get day() { return this.createCustomerForm.get('dateOfBirth').get('day'); }
  get month() { return this.createCustomerForm.get('dateOfBirth').get('month'); }
  get year() { return this.createCustomerForm.get('dateOfBirth').get('year'); }
}
