import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICONS } from '../../../utils/icons';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search-input',
  imports: [NgIf],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
@Input() placeholder: string = 'Search';
  @Input() inputId: string = 'searchInput';
  @Input() fullBorder: boolean = false;
  @Input() showIcon: boolean = true;
  @Output() searchChange = new EventEmitter<string>();

  value: string = '';
  ICONS = ICONS;

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.searchChange.emit(this.value);
  }

  clearInput() {
    this.value = '';
    this.searchChange.emit('');
  }

  get hasValue() {
    return !!this.value.trim();
  }
}
