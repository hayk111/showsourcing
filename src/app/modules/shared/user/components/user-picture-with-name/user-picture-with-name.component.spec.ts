import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPictureWithNameComponent } from './user-picture-with-name.component';

describe('UserPictureWithNameComponent', () => {
  let component: UserPictureWithNameComponent;
  let fixture: ComponentFixture<UserPictureWithNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPictureWithNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPictureWithNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
