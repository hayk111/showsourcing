import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManagementPageComponent } from './data-management-page.component';

describe('DataManagementPageComponent', () => {
  let component: DataManagementPageComponent;
  let fixture: ComponentFixture<DataManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
