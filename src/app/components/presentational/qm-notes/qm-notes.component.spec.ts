import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmNotesComponent } from './qm-notes.component';

describe('QmNotesComponent', () => {
  let component: QmNotesComponent;
  let fixture: ComponentFixture<QmNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
