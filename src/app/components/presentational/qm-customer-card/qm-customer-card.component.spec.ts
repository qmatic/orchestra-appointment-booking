import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmCustomerCardComponent } from './qm-customer-card.component';

describe('QmCustomerCardComponent', () => {
  let component: QmCustomerCardComponent;
  let fixture: ComponentFixture<QmCustomerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmCustomerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmCustomerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
