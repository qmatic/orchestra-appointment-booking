import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAutoCloseComponent } from './qm-auto-close.component';

describe('QmAutoCloseComponent', () => {
  let component: QmAutoCloseComponent;
  let fixture: ComponentFixture<QmAutoCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmAutoCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAutoCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
