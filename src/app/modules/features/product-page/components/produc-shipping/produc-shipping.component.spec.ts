import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducShippingComponent } from './produc-shipping.component';

describe('ProducShippingComponent', () => {
  let component: ProducShippingComponent;
  let fixture: ComponentFixture<ProducShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
