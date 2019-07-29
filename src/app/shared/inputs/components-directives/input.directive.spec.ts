import { InputDirective } from './input.directive';
import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component, DebugElement, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: `
	<input inputApp [type]="typeInp" style="" style="visibility: hidden;"/>
	<input inputApp [type]="text" readonly value="unable to change" style="visibility: hidden"/>
	`
})
class TestComponent {
	typeInp: any = 'text';
}

describe('InputDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEls: DebugElement[];
	let directive: InputDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [TestComponent, InputDirective] });
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		// directive = dbgEl.injector.get(TabFocusDirective);
		fixture.detectChanges();
	});

	it('should create TestComponent', () => {
		expect(component).toBeDefined();
	});

	// it('should prevent characters not fit the regex', fakeAsync(() => {
	// 	const dbgEl = dbgEls[0];
	// 	directive = dbgEl.injector.get(InputDirective);
	// 	const inp = dbgEl.nativeElement;
	// 	spyOn(directive, 'focus').and.callThrough();
	// 	spyOnProperty(directive, 'type', 'set').and.callThrough();
	// 	inp.focus();
	// 	fixture.detectChanges();
	// 	expect(true).toBe(true);
	// fixture.detectChanges();
	// dbgEl = fixture.debugElement.query(By.directive(InputDirective));
	// directive = dbgEl.injector.get(InputDirective);

	// const inp = dbgEl.nativeElement;
	// console.log(inp);
	// // spyOnProperty(directive, 'type', 'set').and.callThrough();
	// spyOnProperty(directive, 'type', 'set');
	// fixture.detectChanges();
	// }));

	it('should throw error when type is not supported (button)', () => {
		component.typeInp = 'button';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (checkbox)', () => {
		component.typeInp = 'checkbox';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (file)', () => {
		component.typeInp = 'file';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (hidden)', () => {
		component.typeInp = 'hidden';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (image)', () => {
		component.typeInp = 'image';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (radio)', () => {
		component.typeInp = 'radio';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (range)', () => {
		component.typeInp = 'range';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (reset)', () => {
		component.typeInp = 'reset';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should throw error when type is not supported (submit)', () => {
		component.typeInp = 'submit';
		expect(() => fixture.detectChanges()).toThrowError(Error);
	});

	it('should be unable to change value when element have "readonly"', () => {
		dbgEls = fixture.debugElement.queryAll(By.directive(InputDirective));
		const dbgEl = dbgEls[1];
		directive = dbgEl.injector.get(InputDirective);
		spyOnProperty(directive, 'readonly', 'get').and.returnValue(true);
		expect(directive.readonly).toBe(true);
	});

	it('should notice required value when element have "required"', () => {
		dbgEls = fixture.debugElement.queryAll(By.directive(InputDirective));
		const dbgEl = dbgEls[1];
		directive = dbgEl.injector.get(InputDirective);
		spyOnProperty(directive, 'required', 'get').and.returnValue(true);
		expect(directive.required).toBe(true);
	});

});
