import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmCustomerAppointmentListComponent } from './qm-customer-appointment-list.component';

describe('QmCustomerAppointmentListComponent', () => {
  let component: QmCustomerAppointmentListComponent;
  let fixture: ComponentFixture<QmCustomerAppointmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmCustomerAppointmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmCustomerAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
