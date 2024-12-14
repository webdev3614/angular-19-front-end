import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptComponent } from './appt.component';

describe('ApptComponent', () => {
  let component: ApptComponent;
  let fixture: ComponentFixture<ApptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
