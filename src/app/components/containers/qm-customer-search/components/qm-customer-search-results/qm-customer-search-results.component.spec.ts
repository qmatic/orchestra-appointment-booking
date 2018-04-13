import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmCustomerSearchResultsComponent } from './qm-customer-search-results.component';

describe('QmCustomerSearchResultsComponent', () => {
  let component: QmCustomerSearchResultsComponent;
  let fixture: ComponentFixture<QmCustomerSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmCustomerSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmCustomerSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
