import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileEntityComponent } from './input-file-entity.component';

describe('InputFileEntityComponent', () => {
  let component: InputFileEntityComponent;
  let fixture: ComponentFixture<InputFileEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFileEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFileEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
