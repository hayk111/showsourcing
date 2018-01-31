import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesChartComponent } from './likes-chart.component';

describe('LikesChartComponent', () => {
  let component: LikesChartComponent;
  let fixture: ComponentFixture<LikesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
