import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesCardComponent } from './likes-card.component';

describe('LikesCardComponent', () => {
  let component: LikesCardComponent;
  let fixture: ComponentFixture<LikesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
