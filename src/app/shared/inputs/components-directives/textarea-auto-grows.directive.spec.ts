import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { TextareaAutoGrowsDirective } from './textarea-auto-grows.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: `
	<textarea autoGrows></textarea>
  `
})
class TestComponent { }

describe('TextareaAutoGrowsDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEl: DebugElement;
	let directive: TextareaAutoGrowsDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [TextareaAutoGrowsDirective, TestComponent]
		});
	});

	it('should create TestComponent', () => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TextareaAutoGrowsDirective));
		fixture.detectChanges();
		expect(component).toBeDefined();
	});

	it('should render with default style', () => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TextareaAutoGrowsDirective));
		directive = dbgEl.injector.get(TextareaAutoGrowsDirective);
		fixture.detectChanges();

		expect(dbgEl.nativeElement.style).not.toBeNull();

		expect(dbgEl.nativeElement.style.overflow).not.toBeNull();
		expect(dbgEl.nativeElement.style.overflow).toBe('hidden');

		expect(dbgEl.nativeElement.style.resize).not.toBeNull();
		expect(dbgEl.nativeElement.style.resize).toBe('none');

		expect(dbgEl.nativeElement.style.height).not.toBeNull();
	});

	it('should call ngOnInit', () => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TextareaAutoGrowsDirective));
		directive = dbgEl.injector.get(TextareaAutoGrowsDirective);
		spyOn(directive, 'ngOnInit');
		fixture.detectChanges();

		expect(directive.ngOnInit).toHaveBeenCalled();
	});


	it('should call onInput when typing', () => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TextareaAutoGrowsDirective));
		directive = dbgEl.injector.get(TextareaAutoGrowsDirective);

		spyOn(directive, 'onInput');
		dbgEl.triggerEventHandler('input', new Event('input'));
		fixture.detectChanges();

		expect(directive.onInput).toHaveBeenCalled();
	});

	it('should resize when the textarea value is changed programmatically', fakeAsync(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TextareaAutoGrowsDirective));
		directive = dbgEl.injector.get(TextareaAutoGrowsDirective);

		const textarea = dbgEl.nativeElement;
		const previousHeight = textarea.clientHeight;

		textarea.value = `
      How much wood would a woodchuck chuck
      if a woodchuck could chuck wood?
		`;

		fixture.detectChanges();
		flush();
		fixture.detectChanges();

		expect(textarea.clientHeight)
			.toBeGreaterThan(previousHeight, 'Expected the textarea height to have increased.');
	}));
});
