import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmDropdownComponent } from './qm-dropdown.component';

describe('QmDropdownComponent', () => {
  let component: QmDropdownComponent;
  let fixture: ComponentFixture<QmDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
