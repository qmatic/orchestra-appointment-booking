import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmDashboardComponent } from './qm-dashboard.component';

describe('QmDashboardComponent', () => {
  let component: QmDashboardComponent;
  let fixture: ComponentFixture<QmDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
