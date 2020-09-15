import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QmLanguageSelectComponent } from './qm-language-select.component';

describe('QmLanguageSelectComponent', () => {
  let component: QmLanguageSelectComponent;
  let fixture: ComponentFixture<QmLanguageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QmLanguageSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QmLanguageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
