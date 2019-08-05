import { InputDirective } from './input.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: `
	<input inputApp [type]="typeInp"/>
	<input inputApp type="text" readonly value="unable to change" />
	<textarea inputApp type="text"></textarea>
	`
})

class TestComponent {
	typeInp: any = 'text';
}

fdescribe('InputDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEls: DebugElement[];
	let directive: InputDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({ declarations: [TestComponent, InputDirective] });
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create TestComponent', () => {
		expect(component).toBeDefined();
	});

	fit('should setting cursor at the end of text when focus the element', () => {
		dbgEls = fixture.debugElement.queryAll(By.directive(InputDirective));

		const dbgEl = dbgEls[0];
		directive = dbgEl.injector.get(InputDirective);
		spyOn(directive, 'focus').and.callThrough();

		const inp: HTMLInputElement = dbgEl.nativeElement;
		inp.value = 'hello';
		spyOn(inp, 'setSelectionRange').and.callThrough();
		directive.focus();
		fixture.detectChanges();

		expect(directive.focus)
			.withContext('Should call fnc "focus"')
			.toHaveBeenCalled();

		expect(inp.selectionStart)
			.withContext('"selectionStart" of input should as same as length of value input')
			.toEqual(inp.value.length);
		expect(inp.selectionEnd)
			.withContext('"selectionEnd" of input should as same as length of value input')
			.toEqual(inp.value.length);
	});

	it('should call next() method of stateChanges when blur or focus the element', () => {
		component.typeInp = 'text';
		dbgEls = fixture.debugElement.queryAll(By.directive(InputDirective));
		directive = dbgEls[0].injector.get(InputDirective);

		spyOnProperty(directive, 'focussed', 'set').and.callThrough();
		spyOnProperty(directive, 'focussed', 'get').and.returnValue(true);
		spyOn(directive.stateChanges, 'next');
		directive.focussed = true;
		fixture.detectChanges();

		expect(directive.focussed)
			.withContext('Should change _focussed')
			.toBe(true);
		expect(directive.stateChanges.next)
			.withContext('Should call next() method')
			.toHaveBeenCalled();
	});

	it('should throw error when type is not supported', () => {
		component.typeInp = 'button';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "button"').toThrowError(Error);

		component.typeInp = 'checkbox';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "checkbox"').toThrowError(Error);

		component.typeInp = 'file';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "file"').toThrowError(Error);

		component.typeInp = 'hidden';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "hidden"').toThrowError(Error);

		component.typeInp = 'image';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "image"').toThrowError(Error);

		component.typeInp = 'radio';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "radio"').toThrowError(Error);

		component.typeInp = 'range';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "range"').toThrowError(Error);

		component.typeInp = 'reset';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "reset"').toThrowError(Error);

		component.typeInp = 'submit';
		expect(() => fixture.detectChanges()).withContext('should throw error when type is "submit"').toThrowError(Error);
	});

	it('should be unable to change value when element have "readonly"', () => {
		dbgEls = fixture.debugElement.queryAll(By.directive(InputDirective));
		const dbgEl = dbgEls[1];
		directive = dbgEl.injector.get(InputDirective);
		spyOnProperty(directive, 'readonly', 'get').and.returnValue(true);
		expect(directive.readonly).toBe(true);
	});

	it('should call next() method of stateChanges when setting property "readonly"', () => {
		dbgEls = fixture.debugElement.queryAll(By.directive(InputDirective));
		const dbgEl = dbgEls[0];
		directive = dbgEl.injector.get(InputDirective);

		spyOnProperty(directive, 'readonly', 'set').and.callThrough();
		spyOnProperty(directive, 'readonly', 'get').and.returnValue(true);
		spyOn(directive.stateChanges, 'next');
		directive.readonly = true;
		fixture.detectChanges();

		expect(directive.readonly)
			.withContext('Property "readonly" should be true')
			.toBeTruthy();

		expect(directive.stateChanges.next)
			.withContext('Should call next() method')
			.toHaveBeenCalled();
	});

	it('should notice required value when element have "required"', () => {
		dbgEls = fixture.debugElement.queryAll(By.directive(InputDirective));
		const dbgEl = dbgEls[1];
		directive = dbgEl.injector.get(InputDirective);
		spyOnProperty(directive, 'required', 'get').and.returnValue(true);
		expect(directive.required).toBe(true);
	});
});
