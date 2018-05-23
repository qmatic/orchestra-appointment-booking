import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmNumberOfCustomersBookerComponent } from './qm-number-of-customers-booker.component';

describe('QmNumberOfCustomersBookerComponent', () => {
  let component: QmNumberOfCustomersBookerComponent;
  let fixture: ComponentFixture<QmNumberOfCustomersBookerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmNumberOfCustomersBookerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmNumberOfCustomersBookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
