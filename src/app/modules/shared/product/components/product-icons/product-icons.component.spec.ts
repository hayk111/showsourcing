import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIconsComponent } from './product-icons.component';

describe('ProductIconsComponent', () => {
  let component: ProductIconsComponent;
  let fixture: ComponentFixture<ProductIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
