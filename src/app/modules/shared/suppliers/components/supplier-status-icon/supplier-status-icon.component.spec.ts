import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierStatusIconComponent } from './supplier-status-icon.component';

describe('SupplierStatusIconComponent', () => {
  let component: SupplierStatusIconComponent;
  let fixture: ComponentFixture<SupplierStatusIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierStatusIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
