import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPackagingComponent } from './input-packaging.component';

describe('InputPackagingComponent', () => {
  let component: InputPackagingComponent;
  let fixture: ComponentFixture<InputPackagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPackagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
