import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFlagComponent } from './favorite-flag.component';

describe('FavoriteFlagComponent', () => {
  let component: FavoriteFlagComponent;
  let fixture: ComponentFixture<FavoriteFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
