import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmMainComponent } from './qm-main.component';

describe('QmMainComponent', () => {
  let component: QmMainComponent;
  let fixture: ComponentFixture<QmMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
