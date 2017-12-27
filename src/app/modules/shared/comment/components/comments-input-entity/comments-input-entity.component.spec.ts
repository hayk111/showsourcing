import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsInputEntityComponent } from './comments-input-entity.component';

describe('CommentsInputEntityComponent', () => {
  let component: CommentsInputEntityComponent;
  let fixture: ComponentFixture<CommentsInputEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsInputEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsInputEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
