import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequestValidationComponent } from './info-request-validation.component';

describe('InfoRequestValidationComponent', () => {
  let component: InfoRequestValidationComponent;
  let fixture: ComponentFixture<InfoRequestValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRequestValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRequestValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
