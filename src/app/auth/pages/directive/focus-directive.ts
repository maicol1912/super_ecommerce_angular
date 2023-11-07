import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[focusNextInput]',
})
export class FocusNextInputDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('input')
  onInput() {
    const nextInput = this.elementRef.nativeElement.nextElementSibling;
    if (nextInput && nextInput instanceof HTMLInputElement) {
      nextInput.focus();
    }
  }
}
