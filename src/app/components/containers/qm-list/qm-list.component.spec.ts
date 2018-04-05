import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmListComponent } from './qm-list.component';

describe('QmListComponent', () => {
  let component: QmListComponent;
  let fixture: ComponentFixture<QmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
