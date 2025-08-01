import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTabComponent } from './active-tab.component';

describe('ActiveTabComponent', () => {
  let component: ActiveTabComponent;
  let fixture: ComponentFixture<ActiveTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
