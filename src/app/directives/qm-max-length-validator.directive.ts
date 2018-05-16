import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Directive({
  selector: '[qmMaxLengthValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: QmMaxLengthValidatorDirective, multi: true}]
})
export class QmMaxLengthValidatorDirective implements Validator {
  @Input('qmMaxLengthValidator') qmMaxLengthValidator: number;
  constructor(private translateService: TranslateService) { }

  validate(control: AbstractControl): {[key: string]: any} {
    const maxLengthError = {
      maxlength: {
        value: this.translateService.get('label.maxlength.error', {0: this.qmMaxLengthValidator})
      }
    };
    return control.value && control.value.length >= this.qmMaxLengthValidator ? maxLengthError : null;
  }
}
