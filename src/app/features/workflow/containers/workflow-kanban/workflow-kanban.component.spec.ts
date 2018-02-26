import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowKanbanComponent } from './workflow-kanban.component';

describe('WorkflowKanbanComponent', () => {
  let component: WorkflowKanbanComponent;
  let fixture: ComponentFixture<WorkflowKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
