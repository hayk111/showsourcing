import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTechDetailsComponent } from './product-tech-details.component';

describe('ProductTechDetailsComponent', () => {
  let component: ProductTechDetailsComponent;
  let fixture: ComponentFixture<ProductTechDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTechDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTechDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
