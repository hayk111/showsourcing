import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContactListComponent } from './input-contact-list.component';

describe('InputContactListComponent', () => {
  let component: InputContactListComponent;
  let fixture: ComponentFixture<InputContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputContactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
