import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCloudComponent } from './filter-cloud.component';

describe('FilterCloudComponent', () => {
  let component: FilterCloudComponent;
  let fixture: ComponentFixture<FilterCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
