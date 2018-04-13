import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmIconListComponent } from './qm-icon-list.component';

describe('QmIconListComponent', () => {
  let component: QmIconListComponent;
  let fixture: ComponentFixture<QmIconListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmIconListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmIconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
