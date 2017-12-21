import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectEntityComponent } from './input-select-entity.component';

describe('InputSelectEntityComponent', () => {
  let component: InputSelectEntityComponent;
  let fixture: ComponentFixture<InputSelectEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSelectEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
