import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageMainCardComponent } from './product-page-main-card.component';

describe('ProductPageMainCardComponent', () => {
  let component: ProductPageMainCardComponent;
  let fixture: ComponentFixture<ProductPageMainCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPageMainCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
