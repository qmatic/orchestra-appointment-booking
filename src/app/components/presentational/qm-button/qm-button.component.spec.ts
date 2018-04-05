import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmButtonComponent } from './qm-button.component';

describe('QmButtonComponent', () => {
  let component: QmButtonComponent;
  let fixture: ComponentFixture<QmButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
