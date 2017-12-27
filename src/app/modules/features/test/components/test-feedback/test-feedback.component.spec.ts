import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFeedbackComponent } from './test-feedback.component';

describe('TestFeedbackComponent', () => {
  let component: TestFeedbackComponent;
  let fixture: ComponentFixture<TestFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
