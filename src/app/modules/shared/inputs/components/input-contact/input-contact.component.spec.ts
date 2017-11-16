import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContactComponent } from './input-contact.component';

describe('InputContactComponent', () => {
  let component: InputContactComponent;
  let fixture: ComponentFixture<InputContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
