import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppointmentIconListComponent } from './qm-appointment-icon-list.component';

describe('QmAppointmentIconListComponent', () => {
  let component: QmAppointmentIconListComponent;
  let fixture: ComponentFixture<QmAppointmentIconListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmAppointmentIconListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppointmentIconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
