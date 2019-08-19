import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as getstream from 'getstream';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { TokenService } from '~core/auth';
import { TokenResponse } from '~common/activity/interfaces/token-response.interface';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { TeamService, UserService } from '~entity-services';
import {
	GetStreamNotification
} from '~common/activity/interfaces/get-stream-feed.interfaces';


/**
 * The activity service gets a feed from getStream as a GetStreamResponse and
 * transform it into a ActivityFeed or a GroupedActivityFeed.
 */

@Injectable({
	providedIn: 'root'
})
export class NotificationActivityService {
	private readonly LIMIT = 10;
	private client: getstream.Client;
	private shouldRefetch$ = new BehaviorSubject(true);
	public shouldUpdateUnreadCount = new Subject<{ allMarkedAsRead: boolean, notificationId?: string }>();
	public isPanelOpen = false;
	constructor(
		private http: HttpClient,
		private teamSrv: TeamService,
		private tokenSrv: TokenService,
		private userSrv: UserService,

	) {
		this.client = getstream.connect(environment.getStreamKey, null, environment.getStreamAppID);
		this.enableRealTimeNotifications();
	}
	private getToken(url): Observable<string> {
		return this.tokenSrv.jwtTokenFeed$.pipe(
			switchMap((token: TokenState) => {
				const headers = new HttpHeaders({ Authorization: token.token });
				return this.http.get<TokenResponse>(url, { headers });
			}),
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
			tap(_ => console.log('fetching notifications...')),
			switchMap(_ => this.getPastNotifications())
		);
	}

	private getPastNotifications(): Observable<GetStreamNotification> {
		return this.getNotificationToken().pipe(
			map(token => this.client.feed('notifications', this.getNotificationUserId(), token)),
			switchMap(feed => feed.get({ limit: this.LIMIT })),
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

	public markAllAsRead(): void {
		this.shouldUpdateUnreadCount.next({ allMarkedAsRead: true });
		this.getNotificationToken().toPromise().then(token => {
			const feed: getstream.Feed = this.client.feed('notifications', this.getNotificationUserId(), token);
			feed.get({ limit: 0, mark_read: true });
		});
	}

	public getMarkAsReadNotifiactions(): Observable<{ allMarkedAsRead: boolean, notificationId?: string }> {
		return this.shouldUpdateUnreadCount.asObservable();
	}

	public openNotificationPanel() {
		this.isPanelOpen = true;
	}

	public closeNotifiactionPanel() {
		this.isPanelOpen = false;
	}


}




