import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  standalone: true,
  templateUrl: './radio-input.component.html',
  styleUrl: './radio-input.component.scss'
})
export class RadioInputComponent {
  @Input() label!: string;
  @Input() value!: string;
  @Input() selectedValue!: string;
  @Input() name: string = 'radio-group';

  @Output() valueChange = new EventEmitter<string>();

  onChange() {
    this.valueChange.emit(this.value);
  }
}
