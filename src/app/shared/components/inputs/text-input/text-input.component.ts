import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICONS } from '../../../utils/icons';

@Component({
  selector: 'app-text-input',
  standalone:true,
  imports: [NgIf],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() value: string = '';
  @Input() showPlaceholder?: boolean=true;
  @Input() fullBorder: boolean = true;
  @Output() valueChange = new EventEmitter<string>();

  passwordHidden: boolean = true;

  get inputType(): string {
    return this.type === 'password' && this.passwordHidden ? 'password' : 'text';
  }

  get hasValue(): boolean {
    return this.value?.length > 0;
  }

  togglePassword(): void {
    this.passwordHidden = !this.passwordHidden;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }

  get inputId(): string {
    return this.label.toLowerCase().replace(/\s+/g, '-');
  }

  ICONS = ICONS;
}
