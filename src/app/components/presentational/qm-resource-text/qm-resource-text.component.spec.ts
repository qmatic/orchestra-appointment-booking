import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmResourceTextComponent } from './qm-resource-text.component';

describe('QmResourceTextComponent', () => {
  let component: QmResourceTextComponent;
  let fixture: ComponentFixture<QmResourceTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmResourceTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmResourceTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
