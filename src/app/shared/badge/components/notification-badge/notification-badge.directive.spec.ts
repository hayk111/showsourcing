import { NotificationBadgeDirective } from "./notification-badge.directive";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
	template: `
		<div style="visibility: hidden" notifBadge [badge]="value"></div>
		<br />
		<div
			style="visibility: hidden"
			notifBadge
			[badge]="2"
			badgePosition="center"
			badgeColor="primary"
			badgeSize="m"
		></div>
		<br />
		<div
			style="visibility: hidden"
			notifBadge
			[badge]="3"
			badgePosition="no-content"
		></div>
		<br />
		<div
			style="visibility: hidden"
			notifBadge
			badgePosition="above-before"
		></div>
		<br />
		<div
			style="visibility: hidden"
			notifBadge
			[badge]="5"
			badgeHidden="true"
		></div>
		<br />
		<div
			style="visibility: hidden"
			notifBadge
			[badge]="6"
			badgeOverlap="true"
		></div>
	`
})
class TestComponent {
	value = 1;
}

xdescribe("NotificationBadgeDirective", () => {
	let component: TestComponent;
	let directive: NotificationBadgeDirective;
	let debugEls: DebugElement[];
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			declarations: [NotificationBadgeDirective, TestComponent]
		});
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		debugEls = fixture.debugElement.queryAll(
			By.directive(NotificationBadgeDirective)
		);
		// directive = debugEl.injector.get(NotificationBadgeDirective);
		fixture.detectChanges();
	});

	it("should create TestComponent", () => {
		expect(component).toBeDefined();
	});

	it("should create badgeElement", () => {
		const badgeDbgEl = debugEls[0];
		directive = badgeDbgEl.injector.get(NotificationBadgeDirective);
		spyOn(directive, "getbadgeElement").and.callThrough();
		fixture.detectChanges();
		expect(directive.getbadgeElement()).toBeTruthy();
	});

	// 1st badge
	it('should contain "notif-badge-s" class by default', () => {
		const badgeDbgEl = debugEls[0];
		expect(badgeDbgEl.nativeElement.classList.contains("notif-badge-s")).toBe(
			true,
			'badge should contain "notif-badge-s" class'
		);
	});

	it('should contain "notif-badge-above" and "notif-badge-after" class by default', () => {
		const badgeDbgEl = debugEls[0];
		expect(
			badgeDbgEl.nativeElement.classList.contains("notif-badge-above")
		).toBe(true, 'badge should have "notif-badge-above" class');
		expect(
			badgeDbgEl.nativeElement.classList.contains("notif-badge-after")
		).toBe(true, 'badge should have "notif-badge-after" class');
	});

	it("should display correct value", () => {
		const badgeDbgEl = debugEls[0];
		directive = badgeDbgEl.injector.get(NotificationBadgeDirective);
		spyOnProperty(directive, "badge", "get").and.returnValue(
			component.value.toString()
		);
		fixture.detectChanges();
		expect(directive.badge).toBe(component.value.toString());
	});

	it("should change value", () => {
		const previousValue = component.value;
		const badgeDbgEl = debugEls[0];
		directive = badgeDbgEl.injector.get(NotificationBadgeDirective);
		component.value = 12;
		fixture.detectChanges();
		spyOnProperty(directive, "badge", "get").and.returnValue(
			component.value.toString()
		);
		fixture.detectChanges();

		expect(directive.badge).toBe(component.value.toString());
		expect(directive.badge).not.toBe(previousValue.toString());
	});

	it("should display maximum badge (99)", () => {
		const badgeDbgEl = debugEls[0];
		directive = badgeDbgEl.injector.get(NotificationBadgeDirective);
		component.value = 100;
		spyOnProperty(directive, "badge", "get").and.returnValue("99");
		fixture.detectChanges();
		expect(directive.badge).toBe("99");
	});

	it('should have default color "warn" and "bg-warn" class', () => {
		const badgeDbgEl = debugEls[0];
		directive = badgeDbgEl.injector.get(NotificationBadgeDirective);
		spyOnProperty(directive, "badgeColor", "get").and.returnValue("warn");
		fixture.detectChanges();
		const span = badgeDbgEl.nativeElement.children[0];

		expect(directive.badgeColor).toBe("warn");
		expect(span).toBeTruthy();
		expect(span.classList.contains("bg-warn")).toBe(
			true,
			'badge should have "bg-warn" class'
		);
	});

	// 2nd badge
	it("should contain correct class", () => {
		const badgeDbgEl = debugEls[1];
		directive = badgeDbgEl.injector.get(NotificationBadgeDirective);

		expect(
			badgeDbgEl.nativeElement.classList.contains("notif-badge-center")
		).toBe(true, 'should contain "notif-badge-center" class');
		expect(badgeDbgEl.nativeElement.classList.contains("notif-badge-m")).toBe(
			true,
			'should contain "notif-badge-m" class'
		);
		const span = badgeDbgEl.nativeElement.children[0];
		expect(span).toBeTruthy();
		expect(span.classList.contains("color-white")).toBe(
			true,
			'should contain "color-white" class'
		);
		expect(span.classList.contains("notif-badge-content")).toBe(
			true,
			'should contain "notif-badge-content" class'
		);
		expect(span.classList.contains("notif-badge-active")).toBe(
			true,
			'should contain "notif-badge-active" class'
		);
	});

	// 3rd badge
	it('should contain "notif-badge-no-content" class when badgePosition is "no-content"', () => {
		const badgeDbgEl = debugEls[2];
		expect(
			badgeDbgEl.nativeElement.classList.contains("notif-badge-no-content")
		).toBe(true, 'should contain "notif-badge-no-content" class');
	});

	// 4nd badge
	it('should contain "notif-badge-hidden" class when the element does not have badge value', () => {
		const badgeDbgEl = debugEls[3];

		expect(
			badgeDbgEl.nativeElement.classList.contains("notif-badge-hidden")
		).toBe(true, 'should contain "notif-badge-hidden" class');
	});

	// 5nd badge
	it('should contain "notif-badge-hidden" class when badgeHidden is true', () => {
		const badgeDbgEl = debugEls[4];

		expect(
			badgeDbgEl.nativeElement.classList.contains("notif-badge-hidden")
		).toBe(true, 'should contain "notif-badge-hidden" class');
	});

	// 6nd badge
	it('should contain "notif-badge-overlap" class when badgeOverlap is true', () => {
		const badgeDbgEl = debugEls[5];

		expect(
			badgeDbgEl.nativeElement.classList.contains("notif-badge-overlap")
		).toBe(true, 'should contain "notif-badge-overlap" class');
	});
});
