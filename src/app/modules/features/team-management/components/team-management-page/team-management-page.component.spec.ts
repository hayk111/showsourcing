import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamManagementPageComponent } from './team-management-page.component';

describe('TeamManagementPageComponent', () => {
  let component: TeamManagementPageComponent;
  let fixture: ComponentFixture<TeamManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
