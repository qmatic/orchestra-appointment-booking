import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmAppLoaderComponent } from './qm-app-loader.component';

describe('QmAppLoaderComponent', () => {
  let component: QmAppLoaderComponent;
  let fixture: ComponentFixture<QmAppLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmAppLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmAppLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
