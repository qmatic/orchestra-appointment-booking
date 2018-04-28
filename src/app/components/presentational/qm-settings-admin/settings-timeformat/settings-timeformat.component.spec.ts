import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTimeformatComponent } from './settings-timeformat.component';

describe('SettingsTimeformatComponent', () => {
  let component: SettingsTimeformatComponent;
  let fixture: ComponentFixture<SettingsTimeformatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsTimeformatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTimeformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
