import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwResettedComponent } from './pw-resetted.component';

describe('PwResettedComponent', () => {
  let component: PwResettedComponent;
  let fixture: ComponentFixture<PwResettedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwResettedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwResettedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
