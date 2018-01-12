import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLoadesComponent } from './test-loades.component';

describe('TestLoadesComponent', () => {
  let component: TestLoadesComponent;
  let fixture: ComponentFixture<TestLoadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestLoadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLoadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
