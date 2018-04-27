import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlDecode'
})
export class HtmlDecodePipe implements PipeTransform {

constructor(private sanitizer: DomSanitizer) {
}
  transform(value: any, args?: any): any {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
}
