import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmPrintBoxComponent } from './qm-print-box.component';

describe('QmPrintBoxComponent', () => {
  let component: QmPrintBoxComponent;
  let fixture: ComponentFixture<QmPrintBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmPrintBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmPrintBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
