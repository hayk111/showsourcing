import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTagCloudComponent } from './filter-tag-cloud.component';

describe('FilterTagCloudComponent', () => {
  let component: FilterTagCloudComponent;
  let fixture: ComponentFixture<FilterTagCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTagCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTagCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
