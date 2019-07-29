import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { TAB } from '@angular/cdk/keycodes';
// import {
// 	dispatchFakeEvent,
// 	dispatchKeyboardEvent,
// 	dispatchMouseEvent,
// 	patchElementFocus,
// } from '@angular/cdk/testing';
import { TabFocusDirective } from './tab-focus.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';

@Component({
	template: `
	<button tabFocus>test</button>
  `
})
class TestComponent { }

describe('TabFocusDirective', () => {
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

	it('should contains focused', fakeAsync(() => {
		const btnElem = dbgEl.nativeElement;
		spyOn(directive, 'formatOrigin').and.callThrough();
		btnElem.focus();
		fixture.detectChanges();
		flush();
		expect(directive.formatOrigin).toHaveBeenCalled();
		expect(directive.elementOrigin).toContain('focused');
	}));

	it('should call "onKeydown" when using keydown', () => {
		spyOn(directive, 'onKeydown');
		dbgEl.triggerEventHandler('keydown', {});
		fixture.detectChanges();
		expect(directive.onKeydown).toHaveBeenCalled();
	});
});
