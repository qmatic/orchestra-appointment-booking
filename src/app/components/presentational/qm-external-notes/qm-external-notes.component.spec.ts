import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QmExternalNotesComponent } from './qm-external-notes.component';

describe('QmExternalNotesComponent', () => {
  let component: QmExternalNotesComponent;
  let fixture: ComponentFixture<QmExternalNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QmExternalNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QmExternalNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
