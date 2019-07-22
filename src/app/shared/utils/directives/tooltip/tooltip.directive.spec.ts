import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
@Component({
	template: `
	<div style="text-align: center;">
		<div toolTip toolTipMessage="toolTip above-right" toolTipPosition="above-right">above-right</div>
		<div toolTip toolTipMessage="toolTip above-left" toolTipPosition="above-left">above-left</div>
		<div toolTip toolTipMessage="toolTip below-right" toolTipPosition="below-right">below-right</div>
		<div toolTip toolTipMessage="toolTip below-left" toolTipPosition="below-left">below-left</div>
		<div toolTip toolTipMessage="toolTip right" toolTipPosition="right">right</div>
		<div toolTip toolTipMessage="toolTip left" toolTipPosition="left">left</div>
	</div>
  `
})

class TestToolTipComponent {
	constructor() { }
}

describe('TooltipDirective', () => {
	let component: TestToolTipComponent;
	let fixture: ComponentFixture<TestToolTipComponent>;
	let fixtureTooltipComponent: ComponentFixture<TooltipComponent>;
	let dbgEls: DebugElement[];

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [TooltipDirective, TestToolTipComponent, TooltipComponent],
			imports: [CommonModule]
		}).compileComponents();

		TestBed.overrideModule(BrowserDynamicTestingModule, {
			set: {
				entryComponents: [TooltipComponent]
			}
		});

		fixture = TestBed.createComponent(TestToolTipComponent);
		component = fixture.componentInstance;
		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		fixture.detectChanges();
	});

	// afterEach(async() => {
	// 	fixture.destroy();
	// 	flush();
	// })

	it('should create TestToolTipComponent', () => {
		expect(component).toBeDefined();
	});

	it('should call "show" when mouseenter the element', () => {
		let directive: TooltipDirective;
		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		const mouseenter = new MouseEvent('mouseenter');

		directive = dbgEls[0].injector.get(TooltipDirective);
		spyOn(directive, 'onMouseEnter');
		dbgEls[0].triggerEventHandler('mouseenter', mouseenter);

		expect(directive.onMouseEnter).toHaveBeenCalled();
	});

	it('should call "hide" when mouseleave the element', () => {
		let directive: TooltipDirective;
		const mouseenter = new MouseEvent('mouseleave');

		directive = dbgEls[0].injector.get(TooltipDirective);
		spyOn(directive, 'onMouseLeave');

		dbgEls[0].nativeElement.dispatchEvent(mouseenter);
		expect(directive.onMouseLeave).toHaveBeenCalled();
	});

	it('should open Tooltip when mouseenter the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[0].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[0].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

		expect(directive.onMouseEnter).toHaveBeenCalled();

		fixture.detectChanges();
		tick(1000); // jasmine.clock().tick(1000);
		expect(document.querySelectorAll('div.tooltip-directive').length).toBeGreaterThan(0);
	}));

	it('should open Tooltip (above-right) when mouseenter the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[0].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[0].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

		expect(directive.onMouseEnter).toHaveBeenCalled();

		fixture.detectChanges();
		tick(1000); // jasmine.clock().tick(1000);
		expect(document.querySelectorAll('div.above-right').length).toBeGreaterThan(0);

		spyOn(directive, 'onMouseLeave').and.callThrough();
		dbgEls[0].triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
		fixture.detectChanges();
		expect(directive.onMouseLeave).toHaveBeenCalled();
		fixture.destroy();
		flush();
	}));

	it('should open Tooltip (above-left) when mouseenter the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[1].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[1].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

		expect(directive.onMouseEnter).toHaveBeenCalled();

		fixture.detectChanges();
		tick(1000); // jasmine.clock().tick(1000);
		expect(document.querySelectorAll('div.above-left').length).toBeGreaterThan(0);

		spyOn(directive, 'onMouseLeave').and.callThrough();
		dbgEls[1].triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
		fixture.detectChanges();
		expect(directive.onMouseLeave).toHaveBeenCalled();
		fixture.destroy();
		flush();
	}));

	it('should open Tooltip (below-right) when mouseenter the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[2].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[2].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

		expect(directive.onMouseEnter).toHaveBeenCalled();

		fixture.detectChanges();
		tick(1000); // jasmine.clock().tick(1000);
		expect(document.querySelectorAll('div.below-right').length).toBeGreaterThan(0);

		spyOn(directive, 'onMouseLeave').and.callThrough();
		dbgEls[2].triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
		fixture.detectChanges();
		expect(directive.onMouseLeave).toHaveBeenCalled();
		fixture.destroy();
		flush();
	}));

	it('should open Tooltip (below-left) when mouseenter the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[3].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[3].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

		expect(directive.onMouseEnter).toHaveBeenCalled();

		fixture.detectChanges();
		tick(1000); // jasmine.clock().tick(1000);
		expect(document.querySelectorAll('div.below-left').length).toBeGreaterThan(0);

		spyOn(directive, 'onMouseLeave').and.callThrough();
		dbgEls[3].triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
		fixture.detectChanges();
		expect(directive.onMouseLeave).toHaveBeenCalled();
		fixture.destroy();
		flush();
	}));

	it('should open Tooltip (right) when mouseenter the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[4].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[4].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

		expect(directive.onMouseEnter).toHaveBeenCalled();

		fixture.detectChanges();
		tick(1000); // jasmine.clock().tick(1000);
		expect(document.querySelectorAll('div.right').length).toBeGreaterThan(0);

		spyOn(directive, 'onMouseLeave').and.callThrough();
		dbgEls[4].triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
		fixture.detectChanges();
		expect(directive.onMouseLeave).toHaveBeenCalled();
		fixture.destroy();
		flush();
	}));

	it('should open Tooltip (left) when mouseenter the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[5].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[5].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));

		expect(directive.onMouseEnter).toHaveBeenCalled();

		fixture.detectChanges();
		tick(1000); // jasmine.clock().tick(1000);
		expect(document.querySelectorAll('div.left').length).toBeGreaterThan(0);

		spyOn(directive, 'onMouseLeave').and.callThrough();
		dbgEls[5].triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
		fixture.detectChanges();
		expect(directive.onMouseLeave).toHaveBeenCalled();
		fixture.destroy();
		flush();
	}));

	it('should hide Tooltip when mouseover the element', fakeAsync(() => {
		let directive: TooltipDirective;
		fixtureTooltipComponent = TestBed.createComponent(TooltipComponent);

		dbgEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
		directive = dbgEls[0].injector.get(TooltipDirective);

		spyOn(directive, 'onMouseEnter').and.callThrough();
		dbgEls[0].triggerEventHandler('mouseenter', new MouseEvent('mouseenter'));
		fixture.detectChanges();

		expect(directive.onMouseEnter).toHaveBeenCalled();

		spyOn(directive, 'onMouseLeave').and.callThrough();
		dbgEls[0].triggerEventHandler('mouseleave', new MouseEvent('mouseleave'));
		fixture.detectChanges();

		expect(directive.onMouseLeave).toHaveBeenCalled();

		tick(1000);
		expect(document.querySelectorAll('div.tooltip-directive').length).toBe(0);

		fixture.destroy();
		flush();
	}));
});
