import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[qmClearInput]'
})
export class QmClearInputDirective implements OnInit {

  isClearInputCreated: Boolean = false;
  $buttonElement: any = $('<span class="form-control-clear glyphicon glyphicon-remove form-control-feedback"></span>');

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('input', ['$event'])
  onInput(event) {
    this.createOrUpdateButtonStatus();
  }

  ngOnInit(): void {
    this.createOrUpdateButtonStatus();
  }

  createOrUpdateButtonStatus() {
    if (!this.isClearInputCreated && $(this.element.nativeElement).val().toString().length > 0) {
      this.$buttonElement.insertAfter($(this.element.nativeElement));
      this.$buttonElement.css({'display': 'block'});
      this.isClearInputCreated = true;
    }  else if (!$(this.element.nativeElement).val().toString().length) {
      this.$buttonElement.css({'display': 'none'});
    }
  }

  removeClearButton() {
    if (this.isClearInputCreated) {
      $('<button class="clear-input-btn">x</button>').insertAfter($(this.element.nativeElement));
      this.isClearInputCreated = false;
    }
  }
}
