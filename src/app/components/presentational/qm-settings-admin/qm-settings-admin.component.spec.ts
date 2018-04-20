import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmSettingsAdminComponent } from './qm-settings-admin.component';

describe('QmSettingsAdminComponent', () => {
  let component: QmSettingsAdminComponent;
  let fixture: ComponentFixture<QmSettingsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmSettingsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmSettingsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
