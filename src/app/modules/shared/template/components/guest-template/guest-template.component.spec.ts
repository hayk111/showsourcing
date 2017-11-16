import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTemplateComponent } from './guest-template.component';

describe('GuestTemplateComponent', () => {
  let component: GuestTemplateComponent;
  let fixture: ComponentFixture<GuestTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
