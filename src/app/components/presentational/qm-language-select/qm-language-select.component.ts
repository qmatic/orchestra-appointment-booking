import { Component, OnInit } from '@angular/core';
import { LanguageDispatchers, LanguageSelectors } from '../../../../store/services/language';
import { ILanguage } from '../../../../models/ILanguage';
import { NgOption } from '@ng-select/ng-select';
import { Observable ,  Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'qm-language-select',
  templateUrl: './qm-language-select.component.html',
  styleUrls: ['./qm-language-select.component.scss']
})
export class QmLanguageSelectComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  private languages$: Observable<ILanguage[]>
  public supportedLanguagesArray: ILanguage[];

  public languages: NgOption[] = [];
  languageForm: FormGroup;

  constructor(
    private languageDispatchers: LanguageDispatchers,
    private LanguageSelectors: LanguageSelectors,
    private fb: FormBuilder,
    private translateService: TranslateService,
  ) {
    this.languages$ = this.LanguageSelectors.languages$;
    this.buildCustomerForm();
  }

  ngOnInit() {
    this.languageDispatchers.fetchLanguages();

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
                  console.log(languageText);
                  this.languages.unshift({ value: '', label: languageText },)
                }
              ).unsubscribe();
    
        this.subscriptions.add(langChangeSubscription);
      }
    })
    this.subscriptions.add(languagesSubscription);
    this.languageForm.get('language').valueChanges.subscribe((v) => {
      this.languageDispatchers.setLanguage(v);
    })
  }


  buildCustomerForm() {
    this.languageForm = this.fb.group({
      language: [''],
    });
    this.languageForm.patchValue({
      language: '',
    });
  }
}
