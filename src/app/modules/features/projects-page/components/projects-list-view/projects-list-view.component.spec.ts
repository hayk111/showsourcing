import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsListViewComponent } from './projects-list-view.component';

describe('ProjectsListViewComponent', () => {
  let component: ProjectsListViewComponent;
  let fixture: ComponentFixture<ProjectsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
