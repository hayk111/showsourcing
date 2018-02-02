import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubInfoComponent } from './product-sub-info.component';

describe('ProductSubInfoComponent', () => {
  let component: ProductSubInfoComponent;
  let fixture: ComponentFixture<ProductSubInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
