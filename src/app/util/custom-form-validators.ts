import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operator/map';
export function whiteSpaceValidator(control: FormControl) {
    const whiteSpaceErrorObject = { 'allwhitespace': true };
    return of(control.value).
        map(v => {
            const isAllWhiteSpace = (control.value || '').trim().length === 0;
            const isValid: boolean = !isAllWhiteSpace;
            if (!isValid && control.dirty) {
                control.setErrors(whiteSpaceErrorObject);
            }
            return !control.dirty || isValid ? null : whiteSpaceErrorObject;
        });
}
