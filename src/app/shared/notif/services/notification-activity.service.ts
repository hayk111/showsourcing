import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as getstream from 'getstream';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { GetStreamNotification } from '~common/activity/interfaces/get-stream-feed.interfaces';
import { TokenResponse } from '~common/activity/interfaces/token-response.interface';
import { TeamService, UserService } from '~core/erm';


@Injectable({
	providedIn: 'root'
})
export class NotificationActivityService {
	private limit: number;
	private client: getstream.Client;
	private shouldUpdateUnreadCount = new Subject<{ allMarkedAsRead: boolean, notificationId?: string }>();
	shouldRefetch$: BehaviorSubject<Boolean> = new BehaviorSubject(true);
	isPanelOpen = false;

	constructor(
		private http: HttpClient,
		private teamSrv: TeamService,
		private userSrv: UserService,
	) {
		this.limit = this.getInitialLimit();
		this.client = getstream.connect(environment.getStreamKey, null, environment.getStreamAppID);
		this.enableRealTimeNotifications();
	}
	private getToken(url): Observable<string> {
		return this.http.get<TokenResponse>(url).pipe(
			map((resp: TokenResponse) => resp.token),
			first()
		);
	}

	/* Notifications */

	private getNotificationToken(): Observable<string> {
		const { userId } = this.userSrv;
		const { id: teamId } = this.teamSrv.selectedTeamSync;
		const tokenUrl = `${environment.apiUrl}/feed/token/user/${teamId}/${userId}`;
		return this.getToken(tokenUrl);
	}

	private getNotificationUserId(): string {
		const { userId } = this.userSrv;
		const { id: teamId } = this.teamSrv.selectedTeamSync;
		return `${teamId}-${userId}`;
	}

	public getNotifications(): Observable<GetStreamNotification> {
		return this.shouldRefetch$.asObservable().pipe(
			switchMap(_ => this.getPastNotifications())
		);
	}

	private getInitialLimit() {
		const SPACES = 80;
		const NOTIF_ITEM_HEIGHT = 57;
		return Math.ceil((window.innerHeight - SPACES) / NOTIF_ITEM_HEIGHT);
	}

	private getPastNotifications(): Observable<GetStreamNotification> {
		return this.getNotificationToken().pipe(
			map(token => this.client.feed('notifications', this.getNotificationUserId(), token)),
			switchMap(feed => feed.get({ limit: this.limit })),
		) as Observable<GetStreamNotification>;
	}

	private enableRealTimeNotifications(): void {
		this.getNotificationToken().toPromise().then(token => {
			const feed = this.client.feed('notifications', this.getNotificationUserId(), token);
			feed.subscribe(_ => this.shouldRefetch$.next(true));
		});
	}

	public markAsRead(notificationId: string): void {
		this.shouldUpdateUnreadCount.next({ allMarkedAsRead: false, notificationId });
		this.getNotificationToken().toPromise().then(token => {
			const feed: getstream.Feed = this.client.feed('notifications', this.getNotificationUserId(), token);
			feed.get({ limit: 0, mark_read: notificationId });
		});
	}

	public loadMore() {
		this.limit += this.getInitialLimit();
		this.shouldRefetch$.next(true);
	}

	public markAllAsRead(): void {
		this.shouldUpdateUnreadCount.next({ allMarkedAsRead: true });
		this.getNotificationToken().toPromise().then(token => {
			const feed: getstream.Feed = this.client.feed('notifications', this.getNotificationUserId(), token);
			feed.get({ limit: 0, mark_read: true });
			this.shouldRefetch$.next(true);
		});
	}

	public getMarkAsReadNotifications(): Observable<{ allMarkedAsRead: boolean, notificationId?: string }> {
		return this.shouldUpdateUnreadCount.asObservable();
	}

	public openNotificationPanel() {
		this.isPanelOpen = true;
	}

	public closeNotificationPanel() {
		this.isPanelOpen = false;
	}

	public onWindowResize(event) {
		if (this.getInitialLimit() > this.limit) {
			this.limit = this.getInitialLimit();
			this.shouldRefetch$.next(true);
		}
	}


}




