import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTestComponent } from './kanban-test.component';

describe('KanbanTestComponent', () => {
  let component: KanbanTestComponent;
  let fixture: ComponentFixture<KanbanTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
