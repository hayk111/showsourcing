import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsInputComponent } from './comments-input.component';

describe('CommentsInputComponent', () => {
  let component: CommentsInputComponent;
  let fixture: ComponentFixture<CommentsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
