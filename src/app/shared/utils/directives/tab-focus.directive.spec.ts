import { TestBed, ComponentFixture } from '@angular/core/testing';

import { TabFocusDirective } from './tab-focus.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: `
	<button tabFocus>test</button>
  `
})
class TestComponent { }

fdescribe('TabFocusDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEl: DebugElement;
	let directive: TabFocusDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [TestComponent, TabFocusDirective] });
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TabFocusDirective));
		directive = dbgEl.injector.get(TabFocusDirective);
		fixture.detectChanges();
	});

	it('should create TestComponent', () => {
		expect(component).toBeDefined();
	});


	it('should call output typing when typing characters or space', () => {
	});

	it('should call output onEnter when enter', () => {
	});
});
