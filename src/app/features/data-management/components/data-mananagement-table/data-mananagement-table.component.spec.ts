import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMananagementTableComponent } from './data-mananagement-table.component';

describe('DataMananagementTableComponent', () => {
  let component: DataMananagementTableComponent;
  let fixture: ComponentFixture<DataMananagementTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataMananagementTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMananagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
