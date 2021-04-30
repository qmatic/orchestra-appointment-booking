import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmVisitListComponent } from './qm-visit-list.component';

describe('QmHistoryListComponent', () => {
  let component: QmVisitListComponent;
  let fixture: ComponentFixture<QmVisitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmVisitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmVisitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});