import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[qmClearInput]'
})
export class QmClearInputDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    $('<button>x</button>').insertAfter($(this.element.nativeElement));
  }
}
