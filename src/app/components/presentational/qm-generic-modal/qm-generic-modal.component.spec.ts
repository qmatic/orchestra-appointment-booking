import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmGenericModalComponent } from './qm-generic-modal.component';

describe('QmGenericModalComponent', () => {
  let component: QmGenericModalComponent;
  let fixture: ComponentFixture<QmGenericModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmGenericModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmGenericModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
