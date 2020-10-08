import { tap } from 'rxjs/operators';
import { of ,  Observable } from 'rxjs';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

export function whiteSpaceValidator(control: FormControl) {
    const whiteSpaceErrorObject = { 'allwhitespace': true };
    return of(control.value).
        map(v => {
            const isAllWhiteSpace = control.value && control.value.trim().length === 0;
            const isValid: boolean = !isAllWhiteSpace;
            if (!isValid && control.dirty) {
                control.setErrors(whiteSpaceErrorObject);
            }
            return !control.dirty || isValid ? null : whiteSpaceErrorObject;
        });
}

export function validateNotEqualToFactory(text: string) {
  return (c: FormControl) => {

    return text !== c.value ? null : {
      validateNotEqual: {
        valid: false
      }
    };
  };
}
