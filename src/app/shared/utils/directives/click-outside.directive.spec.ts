import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { ClickOutsideDirective } from './click-outside.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
@Component({
	template: `
	<div (clickOutside)="click()">test click outside</div>
  `
})

class TestClickOutSideComponent {
	click() {
		console.log('clicked outside');
	}
}

describe('ClickOutsideDirective', () => {
	let component: TestClickOutSideComponent;
	let fixture: ComponentFixture<TestClickOutSideComponent>;
	let dbgEl: DebugElement;
	let directive: ClickOutsideDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [ClickOutsideDirective, TestClickOutSideComponent]
		});

		fixture = TestBed.createComponent(TestClickOutSideComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(ClickOutsideDirective));
		directive = dbgEl.injector.get(ClickOutsideDirective);
		fixture.detectChanges();
	});

	it('should create TestClickOutSideComponent', () => {
		expect(component).toBeDefined();
	});

	it('should call onClick when click', () => {
		spyOn(directive, 'onClick');
		document.dispatchEvent(new MouseEvent('mousedown', {view: window, bubbles: true}));
		fixture.detectChanges();
		expect(directive.onClick).toHaveBeenCalled();
	});

	it('should emit clickOutside when click outside element', () => {
		spyOn(directive.clickOutside, 'emit').and.callThrough();
		spyOn(component, 'click');
		document.dispatchEvent(new MouseEvent('mousedown', {view: window, bubbles: true}));
		fixture.detectChanges();
		expect(directive.clickOutside.emit).toHaveBeenCalled();
		expect(component.click).toHaveBeenCalled();
	});

	it('should not emit clickOutside when click inside element', () => {
		spyOn(directive.clickOutside, 'emit').and.callThrough();
		spyOn(directive, 'onClick');
		dbgEl.nativeElement.dispatchEvent(new MouseEvent('mousedown', {view: window, bubbles: true}));
		expect(directive.onClick).toHaveBeenCalled();
		expect(directive.clickOutside.emit).not.toHaveBeenCalled();
	});
});
