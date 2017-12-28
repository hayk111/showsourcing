import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoBoxComponent } from './basic-info-box.component';

describe('BasicInfoBoxComponent', () => {
  let component: BasicInfoBoxComponent;
  let fixture: ComponentFixture<BasicInfoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
