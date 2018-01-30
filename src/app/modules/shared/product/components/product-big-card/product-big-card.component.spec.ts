import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBigCardComponent } from './product-big-card.component';

describe('ProductBigCardComponent', () => {
  let component: ProductBigCardComponent;
  let fixture: ComponentFixture<ProductBigCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBigCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBigCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
