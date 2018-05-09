import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmStandardRadioComponent } from './qm-standard-radio.component';

describe('QmStandardRadioComponent', () => {
  let component: QmStandardRadioComponent;
  let fixture: ComponentFixture<QmStandardRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmStandardRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmStandardRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
