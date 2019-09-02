import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NotifComponent } from './notif.component';
import { DebugElement } from '@angular/core';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { NotifModule } from '~shared/notif/notif.module';
import { notificationsMock } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Angulartics2Module } from 'angulartics2';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, Subject } from 'rxjs';


class MockNotifService {
	isPanelOpen = false;
	public shouldUpdateUnreadCount = new Subject<{ allMarkedAsRead: boolean, notificationId?: string }>();
	closeNotificationPanel() {
		this.isPanelOpen = false;
	}
	openNotificationPanel() {
		this.isPanelOpen = true;
	}
	getMarkAsReadNotifications() {
		return this.shouldUpdateUnreadCount.asObservable();
	}

}


describe('notif component', () => {

	let component: NotifComponent;
	let fixture: ComponentFixture<NotifComponent>;
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

		fixture = TestBed.createComponent(NotifComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		element = fixture.nativeElement;
		service = debugElement.injector.get(NotificationActivityService);
		component.notifications = notificationsMock;
	});

	it(`should display notifications count badge if unread notifications exists`, () => {
		component.notifications.unread = 1;
		const { unread: expectedUnreadCount } = component.notifications;
		fixture.detectChanges();
		const badge = element.querySelector('span');
		expect(badge).toBeTruthy();
		expect(badge.textContent).toContain(String(expectedUnreadCount));
	});

	it('should not display notification count badge if there is no unread notifications', () => {
		component.notifications.unread = 0;
		fixture.detectChanges();
		const badge = element.querySelector('span');
		expect(badge).toBeFalsy();
	});

	it('should close panel on closePanel and open on openPanel', () => {
		component.closePanel();
		fixture.detectChanges();
		let notificationPanel = element.querySelector('notif-panel-app');
		expect(notificationPanel).toBeFalsy();
		component.openPanel();
		fixture.detectChanges();
		notificationPanel = element.querySelector('notif-panel-app');
		expect(notificationPanel).toBeTruthy();
	});

});
