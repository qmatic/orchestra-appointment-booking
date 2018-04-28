import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCheckboxComponent } from './settings-checkbox.component';

describe('SettingsCheckboxComponent', () => {
  let component: SettingsCheckboxComponent;
  let fixture: ComponentFixture<SettingsCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
