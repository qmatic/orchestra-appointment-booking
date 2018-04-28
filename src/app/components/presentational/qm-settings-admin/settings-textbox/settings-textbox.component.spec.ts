import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTextboxComponent } from './settings-textbox.component';

describe('SettingsTextboxComponent', () => {
  let component: SettingsTextboxComponent;
  let fixture: ComponentFixture<SettingsTextboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsTextboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
