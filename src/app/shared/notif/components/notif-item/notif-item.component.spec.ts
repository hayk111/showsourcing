import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NotificationActivityService } from '~shared/notif/services/notification-activity.service';
import { NotifModule } from '~shared/notif/notif.module';
import { notificationsMock } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { RouterTestingModule } from '@angular/router/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { Angulartics2Module } from 'angulartics2';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotifItemComponent } from './notif-item.component';


class MockNotifService {
	isPanelOpen = false;
	closeNotificationPanel() {
		this.isPanelOpen = false;
	}
	openNotificationPanel() {
		this.isPanelOpen = true;
	}
}

const [mockActivity] = notificationsMock.results;


describe('notif item component', () => {

	let component: NotifItemComponent;
	let fixture: ComponentFixture<NotifItemComponent>;
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
				{ provide: NotificationActivityService, useClass: MockNotifService },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(NotifItemComponent);
		component = fixture.componentInstance;
		debugElement = fixture.debugElement;
		element = fixture.nativeElement;
		service = debugElement.injector.get(NotificationActivityService);
		component.activity = mockActivity;
	});

	it('should generate multiple actors suffix if activity.actor_count > 1 ', () => {
		component.activity.actor_count = 2;
		const expectedSuffix = `and ${component.activity.actor_count - 1} other`;
		fixture.detectChanges();
		const messageElement = element.getElementsByClassName('notif-message')[0];
		expect(messageElement.textContent).toContain(expectedSuffix);
	});

	it(`should not generate multiple actors suffix if activity.actor_count is 1 `, () => {
		component.activity.actor_count = 0;
		const unexpectedSuffix = `and ${component.activity.actor_count - 1} other`;
		fixture.detectChanges();
		const messageElement = element.getElementsByClassName('notif-message')[0];
		expect(messageElement.textContent).not.toContain(unexpectedSuffix);
	});

	it('should have a grey dot in the right top corner if notification is read', () => {
		component.activity.is_read = true;
		fixture.detectChanges();
		const greyDot = element.getElementsByClassName('grey-dot');
		expect(greyDot.length).toBe(1);
	});

	it('should have a primary dot in the right top corner if notification is unread', () => {
		component.activity.is_read = false;
		fixture.detectChanges();
		const greyDot = element.getElementsByClassName('grey-dot');
		const primaryDot = element.getElementsByClassName('primary-dot');
		expect(greyDot.length).toBe(0);
		expect(primaryDot.length).toBe(1);
	});

});
