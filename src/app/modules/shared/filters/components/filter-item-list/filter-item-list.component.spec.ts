import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterItemListComponent } from './filter-item-list.component';

describe('FilterItemListComponent', () => {
  let component: FilterItemListComponent;
  let fixture: ComponentFixture<FilterItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
