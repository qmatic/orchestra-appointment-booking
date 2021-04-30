import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmVisitDetailComponent } from './qm-visit-detail.component';

describe('QmHistoryListComponent', () => {
  let component: QmVisitDetailComponent;
  let fixture: ComponentFixture<QmVisitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmVisitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmVisitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});