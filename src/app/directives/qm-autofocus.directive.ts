import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[qmAutofocus]'
})
export class QmAutofocusDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => this.el.nativeElement.focus(), 0);
  }
}
