import {
	TestBed,
	ComponentFixture,
	fakeAsync,
	tick,
	flush
} from "@angular/core/testing";
import { InfiniScrollDirective } from "./infini-scroll.directive";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
	template: `
		<div
			infiniScroll
			style="max-height: 200px; border: 1px solid; visibility: hidden;"
			(bottomReached)="bottomReachedFnc()"
			(topReached)="topReachedFnc()"
		>
			<div *ngFor="let item of [0, 1, 2, 3, 4, 5]; trackBy: index">
				<div style="height: 75px">{{ item }}</div>
			</div>
		</div>
	`
})
class TestComponent {
	bottomReachedFnc() {}

	topReachedFnc() {}
}

xdescribe("InfiniScrollDirective", () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let dbgEl: DebugElement;
	let directive: InfiniScrollDirective;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [InfiniScrollDirective, TestComponent]
		});

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		dbgEl = fixture.debugElement.query(By.directive(InfiniScrollDirective));
		directive = dbgEl.injector.get(InfiniScrollDirective);
		fixture.detectChanges();
	});

	it("should create TestComponent", () => {
		expect(component).toBeDefined();
	});

	it("should render with default style", () => {
		expect(dbgEl.nativeElement.style).not.toBeNull();
		expect(dbgEl.nativeElement.style["overflow-y"]).toBe("auto");
	});

	it("should call onScroll when scrolling", () => {
		spyOn(directive, "onScroll");
		dbgEl.triggerEventHandler("scroll", {});
		fixture.detectChanges();
		expect(directive.onScroll).toHaveBeenCalled();
	});

	it("should call bottomReached when scroll to bottom", () => {
		spyOn(component, "bottomReachedFnc");
		directive.onScroll({
			target: {
				clientHeight: 200,
				scrollTop: 250
			}
		});
		fixture.detectChanges();
		expect(component.bottomReachedFnc).toHaveBeenCalled();
	});

	it("should call topReached when scroll bottom to top", () => {
		spyOn(component, "topReachedFnc");
		directive.onScroll({
			target: {
				clientHeight: 200,
				scrollTop: 250
			}
		});
		directive.onScroll({
			target: {
				clientHeight: 200,
				scrollTop: -250
			}
		});
		fixture.detectChanges();
		expect(component.topReachedFnc).toHaveBeenCalled();
	});
});
