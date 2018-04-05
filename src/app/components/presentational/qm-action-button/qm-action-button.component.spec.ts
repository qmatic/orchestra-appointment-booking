import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmActionButtonComponent } from './qm-action-button.component';

describe('QmActionButtonComponent', () => {
  let component: QmActionButtonComponent;
  let fixture: ComponentFixture<QmActionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmActionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
