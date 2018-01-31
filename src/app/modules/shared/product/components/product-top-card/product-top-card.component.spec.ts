import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTopCardComponent } from './product-top-card.component';

describe('ProductTopCardComponent', () => {
  let component: ProductTopCardComponent;
  let fixture: ComponentFixture<ProductTopCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTopCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
