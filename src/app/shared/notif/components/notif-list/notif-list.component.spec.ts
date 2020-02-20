import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { NotificationActivityService } from "~shared/notif/services/notification-activity.service";
import { NotifModule } from "~shared/notif/notif.module";
import { notificationsMock } from "~common/activity/interfaces/get-stream-feed.interfaces";
import { RouterTestingModule } from "@angular/router/testing";
import { ApolloTestingModule } from "apollo-angular/testing";
import { Angulartics2Module } from "angulartics2";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NotifListComponent } from "./notif-list.component";
import { Observable } from "rxjs";

class MockNotifService {
	isPanelOpen = false;
	closeNotificationPanel() {
		this.isPanelOpen = false;
	}
	openNotificationPanel() {
		this.isPanelOpen = true;
	}
	getMarkAsReadNotifications() {
		return Observable.create();
	}
}

const { results: activities } = notificationsMock;

xdescribe("notif item component", () => {
	let component: NotifListComponent;
	let fixture: ComponentFixture<NotifListComponent>;
	let element: HTMLElement;
	let debugElement: DebugElement;
	let service: NotificationActivityService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NotifModule,
				RouterTestingModule,
				ApolloTestingModule,
				HttpClientTestingModule,
				Angulartics2Module.forRoot()
			],
			providers: [
				{ provide: NotificationActivityService, useClass: MockNotifService }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(NotifListComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		element = fixture.nativeElement;
		service = debugElement.injector.get(NotificationActivityService);
		component.activities = activities;
	});

	it("should display notif-empty component if the length of activities is 0 ", () => {
		component.activities = [];
		fixture.detectChanges();
		const emptyNotification = element.getElementsByClassName(
			"empty-notification"
		);
		expect(emptyNotification.length).toBe(1);
	});

	it("should display notif-items if the length of activities is grater than 0 ", () => {
		component.activities = notificationsMock.results;
		fixture.detectChanges();
		const emptyNotification = element.getElementsByClassName(
			"notification-item"
		);
		expect(emptyNotification.length).toBe(component.activities.length);
	});
});
