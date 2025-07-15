import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boolean-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boolean-input.component.html',
  styleUrls: ['./boolean-input.component.scss']
})
export class BooleanInputComponent {
  @Input() label: string = '';
  @Input() value: boolean = false;
  @Output() valueChange = new EventEmitter<boolean>();

  onCheckboxChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.checked);
  }
}
