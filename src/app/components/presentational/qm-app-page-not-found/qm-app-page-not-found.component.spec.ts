import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppPageNotFoundComponent } from './qm-app-page-not-found.component';

describe('QmAppPageNotFoundComponent', () => {
  let component: QmAppPageNotFoundComponent;
  let fixture: ComponentFixture<QmAppPageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmAppPageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
