import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsListboxComponent } from './settings-listbox.component';

describe('SettingsListboxComponent', () => {
  let component: SettingsListboxComponent;
  let fixture: ComponentFixture<SettingsListboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsListboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsListboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
