import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmNotificationModalComponent } from './qm-notification-modal.component';

describe('QmNotificationModalComponent', () => {
  let component: QmNotificationModalComponent;
  let fixture: ComponentFixture<QmNotificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmNotificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmNotificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
