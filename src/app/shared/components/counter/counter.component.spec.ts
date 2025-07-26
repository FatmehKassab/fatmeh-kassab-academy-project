import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the quantity', () => {
    component.quantity = 5;
    fixture.detectChanges();
    const quantityText = fixture.nativeElement.textContent;
    expect(quantityText).toContain('5');
  });

  it('should emit increment event on "+" button click', () => {
    spyOn(component.increment, 'emit');

     const button = fixture.nativeElement.querySelector('button'); 
  button.click();
    expect(component.increment.emit).toHaveBeenCalled();
  });

  it('should emit decrement event on "-" button click', () => {
    spyOn(component.decrement, 'emit');

      const button = fixture.nativeElement.querySelector('button'); 
  button.click();
    expect(component.decrement.emit).toHaveBeenCalled();
  });
});
