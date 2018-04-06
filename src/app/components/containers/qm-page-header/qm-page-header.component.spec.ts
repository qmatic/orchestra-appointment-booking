import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmPageHeaderComponent } from './qm-page-header.component';

describe('QmPageHeaderComponent', () => {
  let component: QmPageHeaderComponent;
  let fixture: ComponentFixture<QmPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
