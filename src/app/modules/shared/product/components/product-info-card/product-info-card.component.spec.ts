import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoTextInfoComponent } from './basic-info-text-info.component';

describe('BasicInfoTextInfoComponent', () => {
  let component: BasicInfoTextInfoComponent;
  let fixture: ComponentFixture<BasicInfoTextInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoTextInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoTextInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
