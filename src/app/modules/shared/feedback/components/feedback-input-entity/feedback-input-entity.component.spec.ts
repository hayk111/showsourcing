import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInputEntityComponent } from './feedback-input-entity.component';

describe('FeedbackInputEntityComponent', () => {
  let component: FeedbackInputEntityComponent;
  let fixture: ComponentFixture<FeedbackInputEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackInputEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackInputEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
