import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmPrintPageComponent } from './qm-print-page.component';

describe('QmPrintPageComponent', () => {
  let component: QmPrintPageComponent;
  let fixture: ComponentFixture<QmPrintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmPrintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmPrintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
