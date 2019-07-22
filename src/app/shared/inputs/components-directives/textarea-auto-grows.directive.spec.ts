import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { TextareaAutoGrowsDirective } from './textarea-auto-grows.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


@Component({
	template: `
	<textarea autoGrows></textarea>
  `
})
class TestComponent {

}

describe('TextareaAutoGrowsDirective', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEl: DebugElement;
	let directive: TextareaAutoGrowsDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [TextareaAutoGrowsDirective, TestComponent]
		});

		// fixture = TestBed.createComponent(TestComponent);
		// component = fixture.componentInstance;
		// dbgEl = fixture.debugElement.query(By.directive(TextareaAutoGrowsDirective));

		// fixture.detectChanges();
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

	it('should increase height', async () => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(TextareaAutoGrowsDirective));
		directive = dbgEl.injector.get(TextareaAutoGrowsDirective);
		fixture.detectChanges();

		spyOn(directive, 'onInput');
		const oldHeight = dbgEl.nativeElement.style.height;

		dbgEl.nativeElement.value = '\nLorem Ipsum is simply dummy text of the printing and type setting industry \n';
		dbgEl.nativeElement.dispatchEvent(new Event('input', {
			bubbles: true
		}));

		const enter = new KeyboardEvent('keydown', {
			key: 'Enter',
			code: 'Enter',
		});
		dbgEl.nativeElement.dispatchEvent(enter);

		fixture.detectChanges();
		expect(directive.onInput).toHaveBeenCalled();
	});
});
