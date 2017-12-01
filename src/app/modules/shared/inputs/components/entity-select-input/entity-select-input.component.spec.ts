import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySelectInputComponent } from './entity-select-input.component';

describe('EntitySelectInputComponent', () => {
  let component: EntitySelectInputComponent;
  let fixture: ComponentFixture<EntitySelectInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySelectInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
