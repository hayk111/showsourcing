import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierActivityComponent } from './supplier-activity.component';

describe('SupplierActivityComponent', () => {
  let component: SupplierActivityComponent;
  let fixture: ComponentFixture<SupplierActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
