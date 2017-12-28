import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoActionsComponent } from './basic-info-actions.component';

describe('BasicInfoActionsComponent', () => {
  let component: BasicInfoActionsComponent;
  let fixture: ComponentFixture<BasicInfoActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
