import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSidePreviewComponent } from './product-side-preview.component';

describe('ProductSidePreviewComponent', () => {
  let component: ProductSidePreviewComponent;
  let fixture: ComponentFixture<ProductSidePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSidePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSidePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
