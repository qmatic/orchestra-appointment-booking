import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmDateBookerComponent } from './qm-date-booker.component';

describe('QmDateBookerComponent', () => {
  let component: QmDateBookerComponent;
  let fixture: ComponentFixture<QmDateBookerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmDateBookerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmDateBookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
