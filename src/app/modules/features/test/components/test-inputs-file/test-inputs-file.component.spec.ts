import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInputsFileComponent } from './test-inputs-file.component';

describe('TestInputsFileComponent', () => {
  let component: TestInputsFileComponent;
  let fixture: ComponentFixture<TestInputsFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInputsFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInputsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
