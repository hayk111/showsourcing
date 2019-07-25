import { RestrictSpecialInputDirective } from './restrict-special-input.directive';
import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
	template: `
	<input restrictSpecial type="text" [restrictArrows]="true" style="visibility: hidden"/>
	<input restrictSpecial type="text" [restrictUpDownArrows]="true" style="visibility: hidden"/>
	<input restrictSpecial type="text" style="visibility: hidden"/>
	`
})

class TestComponent { }

describe('RestrictSpecialInputDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEls: DebugElement[];
	let directive: RestrictSpecialInputDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [TestComponent, RestrictSpecialInputDirective], imports: [FormsModule] });
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEls = fixture.debugElement.queryAll(By.directive(RestrictSpecialInputDirective));
		fixture.detectChanges();
	});

	it('should create TestComponent', () => {
		expect(component).toBeDefined();
	});

	// 1st input
	it('should not allow ArrowUp when restrictArrows = true', () => {
		const inp = dbgEls[0].nativeElement;
		directive = dbgEls[0].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowUp', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should not allow ArrowDown when restrictArrows = true', () => {
		const inp = dbgEls[0].nativeElement;
		directive = dbgEls[0].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowDown', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should not allow ArrowRight when restrictArrows = true', () => {
		const inp = dbgEls[0].nativeElement;
		directive = dbgEls[0].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowRight', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should not allow ArrowLeft when restrictArrows = true', () => {
		const inp = dbgEls[0].nativeElement;
		directive = dbgEls[0].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowLeft', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).toHaveBeenCalled();
	});

	// 2nd input
	it('should not allow ArrowUp when restrictUpDownArrows = true', () => {
		const inp = dbgEls[1].nativeElement;
		directive = dbgEls[1].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowUp', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should not allow ArrowDown when restrictUpDownArrows = true', () => {
		const inp = dbgEls[1].nativeElement;
		directive = dbgEls[1].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowDown', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).toHaveBeenCalled();
	});

	it('should allow ArrowRight when restrictUpDownArrows = true', () => {
		const inp = dbgEls[1].nativeElement;
		directive = dbgEls[1].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowRight', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('should allow ArrowLeft when restrictUpDownArrows = true', () => {
		const inp = dbgEls[1].nativeElement;
		directive = dbgEls[1].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowLeft', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	// 3nd input
	it('should allow ArrowUp when not set restrictArrows and restrictUpDownArrows', () => {
		const inp = dbgEls[2].nativeElement;
		directive = dbgEls[2].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowUp', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('should allow ArrowDown when not set restrictArrows and restrictUpDownArrows', () => {
		const inp = dbgEls[2].nativeElement;
		directive = dbgEls[2].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowDown', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('should allow ArrowRight when not set restrictArrows and restrictUpDownArrows', () => {
		const inp = dbgEls[2].nativeElement;
		directive = dbgEls[2].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowRight', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

	it('should allow ArrowLeft when not set restrictArrows and restrictUpDownArrows', () => {
		const inp = dbgEls[2].nativeElement;
		directive = dbgEls[2].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, 'onKeyDown').and.callThrough();
		const event = new KeyboardEvent('keydown', {
			bubbles: true, cancelable: true, shiftKey: false, key: 'ArrowLeft', view: window, altKey: false,
			ctrlKey: false
		});

		spyOn(event, 'preventDefault');
		inp.dispatchEvent(event);
		fixture.detectChanges();

		expect(directive.onKeyDown).toHaveBeenCalled();
		expect(event.preventDefault).not.toHaveBeenCalled();
	});

});
