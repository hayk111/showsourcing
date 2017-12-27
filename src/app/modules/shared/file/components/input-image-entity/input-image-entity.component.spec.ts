import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputImageEntityComponent } from './input-image-entity.component';

describe('InputImageEntityComponent', () => {
  let component: InputImageEntityComponent;
  let fixture: ComponentFixture<InputImageEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputImageEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputImageEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
