import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoIconsInfoComponent } from './basic-info-icons-info.component';

describe('BasicInfoIconsInfoComponent', () => {
  let component: BasicInfoIconsInfoComponent;
  let fixture: ComponentFixture<BasicInfoIconsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoIconsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoIconsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
