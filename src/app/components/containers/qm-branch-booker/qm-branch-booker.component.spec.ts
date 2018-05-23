import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmBranchBookerComponent } from './qm-branch-booker.component';

describe('QmBranchBookerComponent', () => {
  let component: QmBranchBookerComponent;
  let fixture: ComponentFixture<QmBranchBookerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmBranchBookerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmBranchBookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
