import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActivityPageComponent } from './product-activity-page.component';

describe('ProductActivityPageComponent', () => {
  let component: ProductActivityPageComponent;
  let fixture: ComponentFixture<ProductActivityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductActivityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
