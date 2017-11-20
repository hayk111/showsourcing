import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPricePanelComponent } from './filter-price-panel.component';

describe('FilterPricePanelComponent', () => {
  let component: FilterPricePanelComponent;
  let fixture: ComponentFixture<FilterPricePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPricePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPricePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
