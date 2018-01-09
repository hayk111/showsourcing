import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanColComponent } from './kanban-col.component';

describe('KanbanColComponent', () => {
  let component: KanbanColComponent;
  let fixture: ComponentFixture<KanbanColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
