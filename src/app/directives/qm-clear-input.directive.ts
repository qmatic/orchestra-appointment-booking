import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[qmClearInput]'
})
export class QmClearInputDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    const button = this.renderer.createElement('button');
    const text = this.renderer.createText('x');
    this.renderer.appendChild(button, text);
    this.renderer.appendChild(this.element.nativeElement, button);
  }
}
