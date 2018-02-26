import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusBadgeComponent } from './product-status-badge.component';

describe('ProductStatusBadgeComponent', () => {
  let component: ProductStatusBadgeComponent;
  let fixture: ComponentFixture<ProductStatusBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStatusBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStatusBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
