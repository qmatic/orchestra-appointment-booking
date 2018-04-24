import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmUpdateCustomerModalComponent } from './qm-update-customer-modal.component';

describe('QmUpdateCustomerModalComponent', () => {
  let component: QmUpdateCustomerModalComponent;
  let fixture: ComponentFixture<QmUpdateCustomerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmUpdateCustomerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmUpdateCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
