import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCommentsComponent } from './test-comments.component';

describe('TestCommentsComponent', () => {
  let component: TestCommentsComponent;
  let fixture: ComponentFixture<TestCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
