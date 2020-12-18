import { QmClearInputButtonComponent } from './qm-clear-input-button/qm-clear-input-button.component';
import { Directive, HostListener, ElementRef, Renderer2, OnInit,
  ComponentFactory, ComponentFactoryResolver, Input, TemplateRef, ViewContainerRef,
  EventEmitter, Output, ComponentRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({
  selector: '[qmClearInput]',
})
export class QmClearInputDirective implements OnInit  {

  isClearInputCreated: Boolean = false;

  constructor(
    private viewContainer: ViewContainerRef, private element: ElementRef,
    private renderer: Renderer2, private resolver: ComponentFactoryResolver, private control: NgControl) {
  }
  componentRef: ComponentRef<QmClearInputButtonComponent>;
  buttonComponent: QmClearInputButtonComponent;


  @Input()
  isSearchInput: Boolean = false;

  @HostListener('input', ['$event'])
  onInput(event) {
    this.updateButtonVisibility(event.target.value);
  }


  ngOnInit(): void {
   /* const event = new Event('input', {
      'bubbles': true,
      'cancelable': true
    });
    */

    const event = document.createEvent('Event');
    event.initEvent('input', true, true);

    const factory: ComponentFactory<QmClearInputButtonComponent> = this.resolver.resolveComponentFactory(QmClearInputButtonComponent);
    this.componentRef = factory.create(this.viewContainer.parentInjector);
    this.viewContainer.insert(this.componentRef.hostView);
    this.viewContainer.element.nativeElement.classList.add('clear-enabled-input');
    this.componentRef.instance.isSearchInput = this.isSearchInput;
    this.componentRef.instance.clear.subscribe(() =>  {
      this.control.control.setValue('');
      this.viewContainer.element.nativeElement.dispatchEvent(event);
      this.updateButtonVisibility('');
     });

     this.updateButtonVisibility(this.control.control.value);
  }

  updateButtonVisibility(inputText: string) {
    if (inputText) {
      this.componentRef.instance.isVisible = true;
    } else {
      this.componentRef.instance.isVisible = false;
    }
  }
}
