import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListViewComponent } from './tasks-list-view.component';

describe('TasksListViewComponent', () => {
  let component: TasksListViewComponent;
  let fixture: ComponentFixture<TasksListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
