import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectableCardComponent } from './product-selectable-card.component';

describe('ProductSelectableCardComponent', () => {
  let component: ProductSelectableCardComponent;
  let fixture: ComponentFixture<ProductSelectableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSelectableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
