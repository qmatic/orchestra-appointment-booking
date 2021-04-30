import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmHistoryListComponent } from './qm-history-list.component';

describe('QmHistoryListComponent', () => {
  let component: QmHistoryListComponent;
  let fixture: ComponentFixture<QmHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});