import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSupplierDlgComponent } from './new-supplier-dlg.component';

describe('NewSupplierDlgComponent', () => {
  let component: NewSupplierDlgComponent;
  let fixture: ComponentFixture<NewSupplierDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSupplierDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSupplierDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
