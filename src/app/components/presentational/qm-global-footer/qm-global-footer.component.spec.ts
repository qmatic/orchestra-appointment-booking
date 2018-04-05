import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmGlobalFooterComponent } from './qm-global-footer.component';

describe('QmGlobalFooterComponent', () => {
  let component: QmGlobalFooterComponent;
  let fixture: ComponentFixture<QmGlobalFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmGlobalFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmGlobalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
