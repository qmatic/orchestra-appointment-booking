import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlDecode'
})
export class HtmlDecodePipe implements PipeTransform {

constructor(private sanitizer: DomSanitizer) {
}
  transform(value: any, args?: any): any {
    console.log(value + "sdfdsfdsfdfddfsfdf");
    console.log(new DOMParser().parseFromString(value, 'text/html').documentElement.textContent);
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
    //return new DOMParser().parseFromString(value, 'text/html').documentElement.textContent;
  }

}
