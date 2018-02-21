import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMainCardComponent } from './entity-main-card.component';

describe('EntityMainCardComponent', () => {
  let component: EntityMainCardComponent;
  let fixture: ComponentFixture<EntityMainCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityMainCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityMainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
