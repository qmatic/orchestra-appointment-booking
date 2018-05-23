import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmTimeslotBookerComponent } from './qm-timeslot-booker.component';

describe('QmTimeslotBookerComponent', () => {
  let component: QmTimeslotBookerComponent;
  let fixture: ComponentFixture<QmTimeslotBookerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmTimeslotBookerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmTimeslotBookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
