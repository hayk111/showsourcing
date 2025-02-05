import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { UserQueries } from '~entity-services/user/user.queries';
import { GlobalService } from '~entity-services/_global/global.service';
import { User } from '~models';
import { RealmAuthenticationService } from '~core/auth/services/realm-authentication.service';
import { ProductQueries } from '../product/product.queries';
import { SupplierQueries } from '../supplier/supplier.queries';

@Injectable({
	providedIn: 'root',
})
export class UserService extends GlobalService<User> {

	private userId$ = new Subject<string>();
	private user$ = this.userId$.pipe(
		distinctUntilChanged(),
		tap(id => this.userId = id),
		tap(id => {
			ProductQueries.buildQueries(id);
			SupplierQueries.buildQueries(id);
		}),
		switchMap(id => this.selectOne(id)),
		filter(user => !!user),
		shareReplay(1)
	);
	userSync: User;
	static userSync: User;
	userId: string;
	defaultClient = Client.CENTRAL;

	constructor(
		protected apolloState: ApolloStateService,
		protected analyticsSrv: AnalyticsService,
		protected http: HttpClient,
		protected realmAuthSrv: RealmAuthenticationService
	) {
		super(apolloState, UserQueries, 'user', 'users');
	}

	init() {
		this.user$.subscribe(user => {
			this.userSync = user;
			UserService.userSync = user;
			this.userId = user.id;
			this.analyticsSrv.setupUser(user);
		});
		this.realmAuthSrv.realmUser$.pipe(
			filter(realmUser => !!realmUser)
		).subscribe(realmUser => this.userId$.next(realmUser.identity));
	}

	onUserIdChanged(userId: string) {
		this.userId$.next(userId);
	}

	selectUser() {
		return this.user$;
	}

	update(user: User) {
		return this.http.patch<User>(`api/user`, user);
	}

}

