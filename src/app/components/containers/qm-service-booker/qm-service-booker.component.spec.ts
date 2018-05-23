import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmServiceBookerComponent } from './qm-service-booker.component';

describe('QmServiceBookerComponent', () => {
  let component: QmServiceBookerComponent;
  let fixture: ComponentFixture<QmServiceBookerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmServiceBookerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmServiceBookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
