import { RestrictSpecialInputDirective } from "./restrict-special-input.directive";
import {
	ComponentFixture,
	TestBed,
	ComponentFixtureAutoDetect
} from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

@Component({
	template: `
		<input
			restrictSpecial
			type="text"
			[restrictArrows]="true"
			style="visibility: hidden"
		/>
		<input
			restrictSpecial
			type="text"
			[restrictUpDownArrows]="true"
			style="visibility: hidden"
		/>
		<input restrictSpecial type="text" style="visibility: hidden" />
	`
})
class TestComponent {}

xdescribe("RestrictSpecialInputDirective", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEls: DebugElement[];
	let directive: RestrictSpecialInputDirective;

	const createKeyboardEvent = key => {
		return new KeyboardEvent("keydown", {
			bubbles: true,
			cancelable: true,
			shiftKey: false,
			key,
			view: window,
			altKey: false,
			ctrlKey: false
		});
	};

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, RestrictSpecialInputDirective],
			imports: [FormsModule],
			providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
		});
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEls = fixture.debugElement.queryAll(
			By.directive(RestrictSpecialInputDirective)
		);
	});

	it("should create TestComponent", () => {
		expect(component)
			.withContext("Can not create TestComponent for testing")
			.toBeDefined();
	});

	it("should not allow any arrow when restrictArrows true (expect for up down left right)", () => {
		const inp = dbgEls[0].nativeElement;
		directive = dbgEls[0].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, "onKeyDown").and.callThrough();

		let event;

		event = createKeyboardEvent("ArrowUp");
		spyOn(event, "preventDefault");
		inp.dispatchEvent(event);
		expect(event.preventDefault)
			.withContext("ArrowUp was triggered")
			.toHaveBeenCalled();

		event = createKeyboardEvent("ArrowDown");
		spyOn(event, "preventDefault");
		inp.dispatchEvent(event);
		expect(event.preventDefault)
			.withContext("ArrowDown was triggered")
			.toHaveBeenCalled();

		event = createKeyboardEvent("ArrowLeft");
		spyOn(event, "preventDefault");
		inp.dispatchEvent(event);
		expect(event.preventDefault)
			.withContext("ArrowLeft was triggered")
			.toHaveBeenCalled();

		event = createKeyboardEvent("ArrowRight");
		spyOn(event, "preventDefault");
		inp.dispatchEvent(event);
		expect(event.preventDefault)
			.withContext("ArrowRight was triggered")
			.toHaveBeenCalled();

		expect(directive.onKeyDown).toHaveBeenCalledTimes(4);
	});

	it("should not allow any arrow when restrictUpDownArrows true (expect for up down)", () => {
		const inp = dbgEls[1].nativeElement;
		directive = dbgEls[1].injector.get(RestrictSpecialInputDirective);
		spyOn(directive, "onKeyDown").and.callThrough();

		let event;

		event = createKeyboardEvent("ArrowUp");
		spyOn(event, "preventDefault");
		inp.dispatchEvent(event);
		expect(event.preventDefault)
			.withContext("ArrowUp was triggered")
			.toHaveBeenCalled();

		event = createKeyboardEvent("ArrowDown");
		spyOn(event, "preventDefault");
		inp.dispatchEvent(event);
		expect(event.preventDefault)
			.withContext("ArrowDown was triggered")
			.toHaveBeenCalled();

		expect(directive.onKeyDown).toHaveBeenCalledTimes(2);
	});
});
