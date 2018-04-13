import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmCustomerAppointmentsComponent } from './qm-customer-appointments.component';

describe('QmCustomerAppointmentsComponent', () => {
  let component: QmCustomerAppointmentsComponent;
  let fixture: ComponentFixture<QmCustomerAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmCustomerAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmCustomerAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
