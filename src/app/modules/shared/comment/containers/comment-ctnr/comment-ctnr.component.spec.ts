import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCtnrComponent } from './comment-ctnr.component';

describe('CommentCtnrComponent', () => {
  let component: CommentCtnrComponent;
  let fixture: ComponentFixture<CommentCtnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentCtnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentCtnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
