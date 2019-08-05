import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TabFocusActionDirective } from './tab-focus-action.directive';

@Component({
	template: `
	<button tabFocusAction>test</button>
  `
})
class TestComponent { }

describe('TabFocusActionDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEl: DebugElement;
	let directive: TabFocusActionDirective;
	const subscriptions = new Subscription;

	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [TestComponent, TabFocusActionDirective] });
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TabFocusActionDirective));
		directive = dbgEl.injector.get(TabFocusActionDirective);
		fixture.detectChanges();
	});

	afterEach(async () => {
		if (subscriptions) {
			subscriptions.unsubscribe();
		}
	});

	it('should create TestComponent', () => {
		expect(component).toBeDefined();
	});

	it('should call output typing when typing characters or space', async () => {
		let event = new KeyboardEvent('keydown', { key: 'Q', });

		spyOn(directive, 'onTyping').and.callThrough();
		spyOn(event, 'preventDefault');
		dbgEl.triggerEventHandler('keydown', event);

		subscriptions.add(directive.typing.subscribe(res => {
			if (event.key === 'Q') {
				expect(res)
					.withContext('should call output typing when typing characters (expect key "Q"')
					.toBe('Q');
			} else if (event.key === ' ') {
				expect(res)
					.withContext('should call output typing when typing spac (expect key " "')
					.toBe(' ');
			}
		}));
		fixture.detectChanges();
		expect(event.preventDefault).toHaveBeenCalled();

		event = new KeyboardEvent('keydown', { key: ' ', keyCode: 32 } as any);

		spyOn(event, 'preventDefault');
		dbgEl.triggerEventHandler('keydown', event);
		fixture.detectChanges();

		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should call output onKeydownEnter when enter', () => {
		spyOn(directive, 'onKeydownEnter').and.callThrough();
		const event = new KeyboardEvent('keydown', { key: 'Enter' });

		subscriptions.add(directive.keyEnter.subscribe(res =>
			expect(res)
				.withContext('should call output typing when typing space (expect key " "')
				.toBeFalsy()));
		spyOn(event, 'stopImmediatePropagation');
		dbgEl.triggerEventHandler('keydown.enter', event);
		fixture.detectChanges();

		expect(event.stopImmediatePropagation).toHaveBeenCalled();
	});
});
