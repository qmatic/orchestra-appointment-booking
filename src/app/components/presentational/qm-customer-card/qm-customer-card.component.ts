import { Component, OnInit, Input, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import {
  CustomerDispatchers,
  SettingsAdminSelectors,
  UserSelectors,
  AppointmentSelectors
} from '../../../../store';
import { ICustomer } from '../../../../models/ICustomer';
import { ModalService } from '../../../../services/util/modal.service';
import { Setting } from '../../../../models/Setting';
import { IAppointment } from '../../../../models/IAppointment';
import { ILanguageSetting } from '../../../../models/ILanguageSettings';

@Component({
  selector: 'qm-customer-card',
  templateUrl: './qm-customer-card.component.html',
  styleUrls: ['./qm-customer-card.component.scss']
})
export class QmCustomerCardComponent implements OnInit, OnDestroy {
  @Input() customer: ICustomer;
  subscriptions: Subscription = new Subscription();
  userDirection$: Observable<string>;
  settingsMap$: Observable<{ [name: string]: Setting }>;
  phoneEnabled: boolean;
  emailEnabled: boolean;

  private languages$: Observable<ILanguageSetting[]>;
  private languageList: ILanguageSetting[];

  private selectedAppointment$: Observable<IAppointment>;
  public allowClearCustomer: boolean;

  constructor(
    private customerDispatchers: CustomerDispatchers,
    private appointmentSelectors: AppointmentSelectors,
    private modalService: ModalService,
    private settingsAdminSelectors: SettingsAdminSelectors,
    private userSelectors: UserSelectors
  ) {
    this.userDirection$ = this.userSelectors.userDirection$;
    this.settingsMap$ = this.settingsAdminSelectors.settingsAsMap$;
    this.selectedAppointment$ = this.appointmentSelectors.selectedAppointment$;
    this.languages$ = settingsAdminSelectors.languages$;
  }

  ngOnInit() {

    const settingsMapSubscription = this.settingsMap$.subscribe(
      (settingsMap: { [name: string]: Setting }) => {
        this.phoneEnabled = settingsMap.CustomerIncludePhone.value === true;
        this.emailEnabled = settingsMap.CustomerIncludeEmail.value === true;
      }
    );

    const selectedAppointmentSubscription = this.selectedAppointment$.subscribe(
      (selectedAppointment: IAppointment) => {
        if (selectedAppointment !== null) {
          this.allowClearCustomer = false;
        } else {
          this.allowClearCustomer = true;
        }
      }
    );

    const languagesSubscription = this.languages$.subscribe(
      (langs) => {
        this.languageList = langs;
      }
    )

    this.subscriptions.add(settingsMapSubscription);
    this.subscriptions.add(selectedAppointmentSubscription);
    this.subscriptions.add(languagesSubscription);
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  resetCurrentCustomer () {
    this.customerDispatchers.resetCurrentCustomer();
  }

  updateCustomer() {
    this.modalService.openUpdateCustomerModal();
  }

  get language() {
    let customerLanguage = "";
    let langCode = this.extractCustomerLang(this.customer);
    if(this.languageList){
      let langObj = this.languageList.find(lang => lang.key == langCode);
      let defaultLanguage = this.languageList.find(lang => lang.key == "defaultLanguage");

      if(langObj == null){
        langObj = this.languageList.find(lang => lang.key == defaultLanguage.value);
      }

      if(langObj) customerLanguage = langObj.value;
    }

    return customerLanguage;
  }

  extractCustomerLang(customer: ICustomer) : String{
    if(!customer) return null;
    let lang = null;
    let custom = customer.custom;
    if(custom){
      try{
        let customJson = JSON.parse(custom);
        if(customJson["lang"]) lang = customJson["lang"]
      }catch(e){}
    }
    return lang;
  }
}
