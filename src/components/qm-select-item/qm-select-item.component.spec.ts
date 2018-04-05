import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmListSelectItemComponent } from './qm-select-item.component';

describe('QmListItemComponent', () => {
  let component: QmListSelectItemComponent;
  let fixture: ComponentFixture<QmListSelectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmListSelectItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmListSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
