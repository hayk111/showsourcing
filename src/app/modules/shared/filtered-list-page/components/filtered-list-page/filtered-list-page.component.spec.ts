import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredListPageComponent } from './filtered-list-page.component';

describe('FilteredListPageComponent', () => {
  let component: FilteredListPageComponent;
  let fixture: ComponentFixture<FilteredListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
