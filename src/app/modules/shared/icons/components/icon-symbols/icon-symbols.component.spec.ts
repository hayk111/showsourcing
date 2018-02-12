import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSymbolsComponent } from './icon-symbols.component';

describe('IconSymbolsComponent', () => {
  let component: IconSymbolsComponent;
  let fixture: ComponentFixture<IconSymbolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSymbolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
