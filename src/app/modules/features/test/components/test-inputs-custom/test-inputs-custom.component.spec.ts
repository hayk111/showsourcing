import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputsCustomComponent } from './test-inputs-custom.component';

describe('TestInputsCustomComponent', () => {
  let component: TestInputsCustomComponent;
  let fixture: ComponentFixture<TestInputsCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputsCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputsCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
