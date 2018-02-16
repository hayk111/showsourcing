import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingHeartComponent } from './rating-heart.component';

describe('RatingHeartComponent', () => {
  let component: RatingHeartComponent;
  let fixture: ComponentFixture<RatingHeartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingHeartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
