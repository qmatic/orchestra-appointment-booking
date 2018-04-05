import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmListItemComponent } from './qm-list-item.component';

describe('QmListItemComponent', () => {
  let component: QmListItemComponent;
  let fixture: ComponentFixture<QmListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
