import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppComponent } from './qm-app.component';

describe('QmAppComponent', () => {
  let component: QmAppComponent;
  let fixture: ComponentFixture<QmAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
