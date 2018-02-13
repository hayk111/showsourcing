import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskDlgComponent } from './new-task-dlg.component';

describe('NewTaskDlgComponent', () => {
  let component: NewTaskDlgComponent;
  let fixture: ComponentFixture<NewTaskDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
