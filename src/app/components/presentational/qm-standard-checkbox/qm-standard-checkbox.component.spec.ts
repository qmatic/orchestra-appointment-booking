import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmStandardCheckboxComponent } from './qm-standard-checkbox.component';

describe('QmStandardCheckboxComponent', () => {
  let component: QmStandardCheckboxComponent;
  let fixture: ComponentFixture<QmStandardCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmStandardCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmStandardCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
