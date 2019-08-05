import { RestrictInputDirective } from './restrict-input.directive';
import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RegexpApp } from '~utils/regexes';

@Component({
	template: `
	<input [restrictInput]="type" [type]="type" style="visibility: hidden"/>
	`
})

class TestComponent {
	type: string;
}

describe('RestrictInputDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEl: DebugElement;
	let directive: RestrictInputDirective;

	const createKeyboardEvent = (key, charCode) => new KeyboardEvent('keypress', {
		bubbles: true, cancelable: true, shiftKey: false, key, view: window, altKey: false,
		ctrlKey: false, charCode
	} as any);

	const telKeyNotAllow = [['x', 120], [',', 44], ['[', 91], ['z', 122]]
	const telKeyAllow = [['.', 46], ['-', 45], ['/', 47], ['+', 43], [' ', 32], ['(', 40], [')', 41], ['1', 49], ['0', 48]];

	const decimalKeyNotAllow = [['x', 120], ['/', 47], ['[', 91], ['z', 122]];
	const decimalKeyAllow = [['0', 48], ['1', 49], ['7', 55], ['.', 46], [',', 44]];

	const digitKeyNotAllow = [['x', 120], [',', 44], ['[', 91], ['z', 122]];
	const digitKeyAllow = [['0', 48], ['1', 49], ['5', 53], ['9', 57]];

	const testInp = (type, allowArray, notAllowArray) => {
		component.type = type;
		spyOn(directive, 'onKeyPress').and.callThrough();
		let event;

		for (const item of allowArray) {
			event = createKeyboardEvent(item[0], item[1]);
			spyOn(event, 'preventDefault');
			dbgEl.triggerEventHandler('keypress', event);
			fixture.detectChanges();

			expect(directive.onKeyPress)
				.withContext(`Should call onKeyPress; key: ${item[0]} - charCode: ${item[1]}`)
				.toHaveBeenCalled();
			expect(event.preventDefault)
				.withContext(`Should allow key: ${item[0]} - charCode: ${item[1]}`)
				.not.toHaveBeenCalled();
		}

		for (const item of notAllowArray) {
			event = createKeyboardEvent(item[0], item[1]);
			spyOn(event, 'preventDefault');
			dbgEl.triggerEventHandler('keypress', event);
			fixture.detectChanges();

			expect(directive.onKeyPress)
				.withContext(`Should call onKeyPress; key: ${item[0]} - charCode: ${item[1]}`)
				.toHaveBeenCalled();
			expect(event.preventDefault)
				.withContext(`Should not allow key: ${item[0]} - charCode: ${item[1]}`)
				.toHaveBeenCalled();
		}
	};

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, RestrictInputDirective],
			imports: [FormsModule]
		});
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(RestrictInputDirective));
		directive = dbgEl.injector.get(RestrictInputDirective);
	});

	it('should create TestComponent', () => {
		expect(component).withContext('Can not create TestComponent for testing').toBeDefined();
	});

	it('should setting right regex with specific type of input tag)', () => {

		component.type = 'number';
		fixture.detectChanges();
		expect(directive.regex).toEqual(new RegExp(RegexpApp.DIGITS));

		component.type = 'decimal';
		fixture.detectChanges();
		expect(directive.regex).toEqual(new RegExp(RegexpApp.DECIMAL));

		component.type = 'tel';
		fixture.detectChanges();
		expect(directive.regex).toEqual(new RegExp(RegexpApp.PHONE));
	});


	it('should call onKeyPress and prevent (or allow) characters which are not fitted (or fitted) the regex (expect for type number)', () => {
		testInp('number', digitKeyAllow, digitKeyNotAllow);
	});

	it('should call onKeyPress and prevent (or allow) characters which are not fitted (or fitted) the regex (expect for type tel)', () => {
		testInp('tel', telKeyAllow, telKeyNotAllow);
	});

	it('should call onKeyPress and prevent (or allow) characters which are not fitted (or fitted) the regex (expect for type decimal)', () => {
		testInp('decimal', decimalKeyAllow, decimalKeyNotAllow);
	});
});
