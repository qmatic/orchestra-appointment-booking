import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmIconItemComponent } from './qm-icon-item.component';

describe('QmIconItemComponent', () => {
  let component: QmIconItemComponent;
  let fixture: ComponentFixture<QmIconItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmIconItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmIconItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
