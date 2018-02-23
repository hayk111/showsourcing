import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSampleComponent } from './product-sample.component';

describe('ProductSampleComponent', () => {
  let component: ProductSampleComponent;
  let fixture: ComponentFixture<ProductSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
