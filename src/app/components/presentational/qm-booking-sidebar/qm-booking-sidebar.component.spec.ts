import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmBookingSidebarComponent } from './qm-booking-sidebar.component';

describe('QmBookingSidebarComponent', () => {
  let component: QmBookingSidebarComponent;
  let fixture: ComponentFixture<QmBookingSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmBookingSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmBookingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
