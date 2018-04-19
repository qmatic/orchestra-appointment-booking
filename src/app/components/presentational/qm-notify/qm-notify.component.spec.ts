import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmNotifyComponent } from './qm-notify.component';

describe('QmNotifyComponent', () => {
  let component: QmNotifyComponent;
  let fixture: ComponentFixture<QmNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
