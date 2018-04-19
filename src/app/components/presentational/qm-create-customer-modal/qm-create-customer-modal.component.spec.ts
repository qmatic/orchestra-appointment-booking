import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmCreateCustomerModalComponent } from './qm-create-customer-modal.component';

describe('QmCreateCustomerModalComponent', () => {
  let component: QmCreateCustomerModalComponent;
  let fixture: ComponentFixture<QmCreateCustomerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmCreateCustomerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmCreateCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
