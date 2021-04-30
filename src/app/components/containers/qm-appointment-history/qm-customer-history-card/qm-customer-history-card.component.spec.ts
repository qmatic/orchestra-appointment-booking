import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmCustomerHistoryCardComponent } from './qm-customer-history-card.component';

describe('QmCustomerCardComponent', () => {
  let component: QmCustomerHistoryCardComponent;
  let fixture: ComponentFixture<QmCustomerHistoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmCustomerHistoryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmCustomerHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
