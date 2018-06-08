import { AutoClose } from './../../../../services/util/autoclose.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {
  CustomerSelectors,
  UserSelectors,
  SettingsAdminSelectors,
  CustomerDispatchers
} from '../../../../store';
import { ICustomer } from '../../../../models/ICustomer';
// import { whiteSpaceValidator } from '../../../util/custom-form-validators';
import { Setting } from '../../../../models/Setting';
import { whiteSpaceValidator } from '../../../util/custom-form-validators';

@Component({
  selector: 'qm-notification-modal',
  templateUrl: './qm-notification-modal.component.html',
  styleUrls: ['./qm-notification-modal.component.scss']
})
export class QmNotificationModalComponent implements OnInit, OnDestroy {
  private currentCustomer$: Observable<ICustomer>;
  private subscriptions: Subscription = new Subscription();
  public userDirection$: Observable<string>;
  public settingsMap$: Observable<{ [name: string]: Setting }>;
  public notificationForm: FormGroup;

  public settingsMap: { [name: string]: Setting };

  private currentCustomer: ICustomer;
  public typeToEdit: string;
  private saveToCustomerObject = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private customerSelectors: CustomerSelectors,
    private userSelectors: UserSelectors,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private customerDispatchers: CustomerDispatchers,
    private autoCloseService: AutoClose
  ) {
    this.currentCustomer$ = this.customerSelectors.currentCustomer$;
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
  }

  ngOnInit() {
    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.settingsMap = settingsMap;
      }
    );

    const currentCustomerSubscription = this.currentCustomer$.subscribe(
      (currentCustomer: ICustomer) => (this.currentCustomer = currentCustomer)
    );

    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(currentCustomerSubscription);

    this.buildCustomerForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleSaveToCustomerChange(event: Event) {
    const element: HTMLInputElement = <HTMLInputElement>event.target;
    this.saveToCustomerObject = element.checked;
  }

  includeEmailField(): boolean {
    return this.typeToEdit === 'email' || this.typeToEdit === 'both';
  }

  includePhoneField(): boolean {
    return this.typeToEdit === 'sms' || this.typeToEdit === 'both';
  }

  onSubmit() {
    const updatedCustomerObject: ICustomer = this.getUpdatedCustomerObject();
    if (this.saveToCustomerObject === true) {
      this.customerDispatchers.updateCustomer(updatedCustomerObject);
    }
    this.activeModal.close(updatedCustomerObject);
  }

  getUpdatedCustomerObject() {
    const formModel = this.notificationForm.value;

    switch (this.typeToEdit) {
      case 'email': {
        return {
          ...this.currentCustomer,
          email: formModel.notificationEmail as string
        };
      }
      case 'sms': {
        return {
          ...this.currentCustomer,
          phone: formModel.notificationPhone as string
        };
      }
      case 'both': {
        return {
          ...this.currentCustomer,
          email: formModel.notificationEmail as string,
          phone: formModel.notificationPhone as string
        };
      }
    }
  }

  buildCustomerForm() {
    const phoneValidators = [
      Validators.pattern(/^[0-9\+\s]+$/),
      Validators.required
    ];
    const emailValidators = [
      Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}$/),
      Validators.required
    ];

    if (this.typeToEdit === 'email') {
      this.notificationForm = this.fb.group({
        notificationEmail: ['', emailValidators]
      });
    }

    if (this.typeToEdit === 'sms') {
      this.notificationForm = this.fb.group({
        notificationPhone: [
          this.settingsMap.CustomerPhoneDefaultCountry.value || '',
          phoneValidators, whiteSpaceValidator
        ]
      });
    }

    if (this.typeToEdit === 'both') {
      this.notificationForm = this.fb.group({
        notificationEmail: ['', emailValidators],
        notificationPhone: [
          this.settingsMap.CustomerPhoneDefaultCountry.value || '',
          phoneValidators, whiteSpaceValidator
        ]
      });
    }
  }

  get notificationPhone() {
    return this.notificationForm.get('notificationPhone');
  }
  get notificationEmail() {
    return this.notificationForm.get('notificationEmail');
  }
}
