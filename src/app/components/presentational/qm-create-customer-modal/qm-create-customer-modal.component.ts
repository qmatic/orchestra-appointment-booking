
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgOption } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { Subscription ,  Observable } from 'rxjs';

import { CustomerSelectors } from './../../../../store/services/customer/customer.selectors';
import { Setting } from './../../../../models/Setting';
import { ICustomer } from '../../../../models/ICustomer';
import {
  CustomerDispatchers,
  UserSelectors,
  SettingsAdminSelectors
} from '../../../../store';
import { whiteSpaceValidator, validateNotEqualToFactory } from '../../../util/custom-form-validators';
import { AutoClose } from '../../../../services/util/autoclose.service';
import { ILanguage } from '../../../../models/ILanguage';
import { LanguageDispatchers, LanguageSelectors } from '../../../../store/services/language';


@Component({
  selector: 'qm-create-customer-modal',
  templateUrl: './qm-create-customer-modal.component.html',
  styleUrls: ['./qm-create-customer-modal.component.scss']
})
export class QmCreateCustomerModalComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  createCustomerForm: FormGroup;
  settingsMap$: Observable<{ [name: string]: Setting }>;
  isOnUpdate: Boolean = false;
  public isLanguageSelectEnabled: boolean;
  currentCustomer$: Observable<ICustomer>;
  currentCustomer: ICustomer;
  languages$: Observable<ILanguage[]>;
  supportedLanguagesArray: ILanguage[];
  customerPhonePrefix : string = '';
  private dateLabelKeys: string[] = [
    'label.month.none',
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

  public months: NgOption[];
  public languages: NgOption[] = [];
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private customerDispatchers: CustomerDispatchers,
    private userSelectors: UserSelectors,
    private translateService: TranslateService,
    private settingAdminSelectors: SettingsAdminSelectors,
    private customerSelectors: CustomerSelectors,
    public autoCloseService: AutoClose,
    public LanguageSelectors: LanguageSelectors,
    public languageDispatchers: LanguageDispatchers
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingAdminSelectors.settingsAsMap$;
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.languages$ = this.LanguageSelectors.languages$;
    if (!this.isOnUpdate) {
      this.buildCustomerForm();
    }
  }

  ngOnInit() {
    let currentCustomerSubscription = null;
    this.languageDispatchers.fetchLanguages();
    if (this.isOnUpdate) {
      currentCustomerSubscription = this.currentCustomer$.subscribe(
        (currentCustomer: ICustomer) => {
          this.currentCustomer = currentCustomer;
          if (currentCustomer.publicId && !currentCustomer.id) {
            this.customerDispatchers.getCustomerById(currentCustomer.publicId);
          }
          this.buildCustomerForm();
          this.setUpdatingCustomerFields();
        }
      );
    }

    const translateSubscription = this.translateService
      .get(this.dateLabelKeys)
      .subscribe((dateLabels: string[]) => {
        this.months = [
          { value: '', label: dateLabels['label.month.none'] },
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
          { value: '12', label: dateLabels['label.december'] }
        ];
      });
    this.subscriptions.add(translateSubscription);
    if (currentCustomerSubscription) {
      this.subscriptions.add(currentCustomerSubscription);
    }

    let languagesSubscription = this.languages$.subscribe((languages) => {
      this.supportedLanguagesArray = languages;
      if (this.supportedLanguagesArray && (this.languages.length !== languages.length)) {
        this.languages = this.supportedLanguagesArray
          .map(language => ({
            value: language.key,
            label: language.value
          }));
        const langChangeSubscription = this.translateService
              .get('label.language.defaultlanguage')
              .subscribe(
                (languageText: string) => {
                  this.languages.unshift({ value: '', label: languageText },)
                }
              ).unsubscribe();
    
        this.subscriptions.add(langChangeSubscription);
      }
    })
    this.subscriptions.add(languagesSubscription);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
// Check DOB validitiy
  isValidDOBEntered(control: FormGroup) {
    let errors = null;
    if (control.value) {
      // invalid date check for leap year
      if (control.value.year && control.value.month && control.value.day) {
        const d = new Date(
          control.value.year,
          parseInt(control.value.month, 10) - 1,
          control.value.day
        );
        if (d && d.getMonth() + 1 !== parseInt(control.value.month, 10)) {
          control.setErrors({
            invalidDay: true
          });
          errors = { ...errors, invalidDay: true };
        }
      } else if (
        control.value.year ||
        control.value.month ||
        control.value.day
      ) {
        control.setErrors({
          incompleteDay: true
        });
        errors = { ...errors, incompleteDob: true };
      }
    }
    return errors;
  }
// Build customer form
  buildCustomerForm() {
    this.settingsMap$.subscribe(settings => {
      const phoneValidators = [Validators.pattern(/^[0-9\+\s]+$/)];
      this.customerPhonePrefix = settings.CustomerPhoneDefaultCountry.value;
      const phoneAsyncValidators = [];
      this.isLanguageSelectEnabled = settings.languageSelect.value;
      if (settings.CustomerPhoneRequired.value === true) {
        phoneValidators.push(Validators.required);
        phoneAsyncValidators.push(whiteSpaceValidator);

        if (settings.CustomerPhoneDefaultCountry.value !== '') {
          const notEqualValidator = validateNotEqualToFactory(settings.CustomerPhoneDefaultCountry.value);
          phoneValidators.push(notEqualValidator);
        }
      }

      const emailValidators = [
        Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,}$/)
      ];

      if (settings.CustomerIncludeEmailRequired.value === true) {
        emailValidators.push(Validators.required);
      }

      let dayValidators = [Validators.maxLength(2), Validators.max(31)];
      let yearValidators = [Validators.maxLength(4), Validators.min(1)];
      let monthValidators = [];

      if (settings.CustomerIncludeDateofBirthRequired.value === true) {
        dayValidators = [...dayValidators, Validators.required];
        yearValidators = [...yearValidators, Validators.required];
        monthValidators = [...monthValidators, Validators.required];
      }

      this.createCustomerForm = this.fb.group({
        firstName: ['', Validators.required, whiteSpaceValidator],
        lastName: ['', Validators.required, whiteSpaceValidator],
        email: ['', emailValidators],
        phone: [
          settings.CustomerPhoneDefaultCountry.value || '',
          phoneValidators,
          ...phoneAsyncValidators
        ],
        dateOfBirth: this.fb.group(
          {
            month: [null, monthValidators],
            day: ['', dayValidators],
            year: ['', yearValidators]
          },
          {
            validator: this.isValidDOBEntered.bind(this)
          }
        ),
        language: [''],
      });
    });
  }
// Update customer fields
  setUpdatingCustomerFields() {
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
        dobDate.getFullYear()
      );
    }

    this.createCustomerForm.patchValue({
      firstName: this.currentCustomer.firstName,
      lastName: this.currentCustomer.lastName,
      email: this.currentCustomer.email,
      phone: (this.currentCustomer.phone === '' && this.customerPhonePrefix) ? this.customerPhonePrefix : this.currentCustomer.phone,
      dateOfBirth: {
        month: date.month ? date.month : null,
        day: date.day ? date.day : '',
        year: date.year ? date.year : ''
      },
      language: (this.currentCustomer.custom && JSON.parse(this.currentCustomer.custom.toString()) && 
        JSON.parse(this.currentCustomer.custom.toString()).lang) ? JSON.parse(this.currentCustomer.custom.toString()).lang : ""
    });
  }
// Format Date
  formatDate(day, month, year) {
    let newDay, newMonth;
    if (day !== '' || day !== undefined) {
      const intDay = parseInt(day, 10);
      newDay = intDay;
      if (intDay < 10) {
        newDay = '0' + intDay;
      }
    }

    if (month !== '' || month !== undefined) {
      const intMonth = parseInt(month, 10) + 1;
      if (intMonth < 10) {
        newMonth = '0' + intMonth;
      } else {
        newMonth = intMonth.toString();
      }
    }

    return {
      day: newDay,
      month: newMonth,
      year: year
    };
  }
// Check for Date of Birth Validity
  isDOBRequired(): boolean {
    const dobGroup: FormGroup = this.createCustomerForm.controls[
      'dateOfBirth'
    ] as FormGroup;
    const dayControl = dobGroup.controls['day'];
    const yearControl = dobGroup.controls['year'];
    const monthControl = dobGroup.controls['month'];
    return (
      dobGroup.dirty &&
      dayControl.dirty &&
      monthControl.dirty &&
      yearControl.dirty &&
      ((dayControl.errors && dayControl.errors.required) ||
        (yearControl.errors && yearControl.errors.required) ||
        (monthControl.errors && monthControl.errors.required))
    );
  }
// Submitting
  onSubmit() {
    const customer: ICustomer = this.prepareSaveCustomer();
    if (this.isOnUpdate) {
      this.customerDispatchers.updateCustomer(customer);
    } else {
      this.customerDispatchers.createCustomer(customer);
    }
    this.activeModal.close();
  }

// Prepare save customer
  prepareSaveCustomer(): ICustomer {
    const formModel = this.createCustomerForm.value;

    const customerToSave: ICustomer = {
      id: this.isOnUpdate ? this.currentCustomer.id : undefined,
      firstName: formModel.firstName as string,
      lastName: formModel.lastName as string,
      name: ((formModel.firstName as string) +
        ' ' +
        formModel.lastName) as string,
      email: formModel.email as string,
      phone: (this.customerPhonePrefix === formModel.phone as string) ? '' : formModel.phone,
      dateOfBirth: this.getDateOfBirth() || null,
      // custom: formModel.language ? `{\\\"lang\\\":\\\"${formModel.language as string}\\\"}`  : '',
      custom: formModel.language ? JSON.stringify({ "lang" : formModel.language as string }) : ''
    };

    // trim trailing spaces
    for (const key in customerToSave) {
      if (customerToSave[key] && customerToSave[key].trim) {
        customerToSave[key] = customerToSave[key].trim();
      }
    }

    return customerToSave;
  }

  getDateOfBirth(): string {
    const formModel = this.createCustomerForm.value;
    let year = String(formModel.dateOfBirth.year);
    let month = formModel.dateOfBirth.month as string;
    let day = formModel.dateOfBirth.day as string;

    if (day && parseInt(day, 10)) {
      const intDay = parseInt(day, 10);
      if (intDay < 10) {
        day = '0' + intDay;
      }
    }

    year = this.leftPadWithZeros(year, 4);

    return year && month && day ? year + '-' + month + '-' + day : '';
  }

  leftPadWithZeros(sourceString, length) {
    while (sourceString.length < length) {
      sourceString = '0' + sourceString;
    }
    return sourceString;
  }

  restrictNumbers($event) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode($event.charCode);

    if (!pattern.test(inputChar)) {
      $event.preventDefault();
    }
  }

  get firstName() {
    return this.createCustomerForm.get('firstName');
  }
  get lastName() {
    return this.createCustomerForm.get('lastName');
  }
  get email() {
    return this.createCustomerForm.get('email');
  }
  get phone() {
    return this.createCustomerForm.get('phone');
  }
  get language() {
    return this.createCustomerForm.get('language');
  }
  get day() {
    return this.createCustomerForm.get('dateOfBirth').get('day');
  }
  get month() {
    return this.createCustomerForm.get('dateOfBirth').get('month');
  }
  get year() {
    return this.createCustomerForm.get('dateOfBirth').get('year');
  }
}
