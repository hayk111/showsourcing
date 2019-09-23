import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap, tap, filter } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService, ClientStatus, TeamClientInitializer, UserClientInitializer } from '~core/apollo/services';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { GlobalDataClientsInitializer } from '~core/apollo/services/apollo-global-data-client.service';
import { GlobalRequestClientsInitializer } from '~core/apollo/services/apollo-global-request-client.service';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { RealmAuthenticationService } from '~core/auth/services/realm-authentication.service';
import { ListPageService } from '~core/list-page';
import { CompanyService, TeamService, UserService } from '~entity-services';
import { Team } from '~models';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	isSpinnerShown$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(
		private analytics: AnalyticsService,
		private apolloState: ApolloStateService,
		private authSrv: AuthenticationService,
		private realmAuthSrv: RealmAuthenticationService,
		private companySrv: CompanyService,
		private globalDataClient: GlobalDataClientsInitializer,
		private globalRequestClient: GlobalRequestClientsInitializer,
		private teamClient: TeamClientInitializer,
		private teamSrv: TeamService,
		private userClient: UserClientInitializer
	) { }

	ngOnInit(): void {
		this.authSrv.init();
		this.realmAuthSrv.init();
		this.teamSrv.init();
		this.companySrv.init();
		this.analytics.init();

		const hasTeam$ = this.teamSrv.hasTeamSelected$;
		const teamClientStatus$ = this.apolloState.getClientStatus(Client.TEAM);
		// we only want the loader to appear when we have a team selected and the team client status is pending
		combineLatest(
			hasTeam$,
			teamClientStatus$,
			(hasTeam, teamClientStatus) => hasTeam && teamClientStatus === ClientStatus.PENDING
		).subscribe(show => this.isSpinnerShown$.next(show));

		// when a realm user is found we start the required clients
		this.realmAuthSrv.realmUser$.pipe(
			filter(user => !!user),
			switchMap(_ => this.startBaseClients()),
		).subscribe();

		// when logging off we destroy all clients
		this.authSrv.notAuthenticated$.subscribe(_ => this.destroyAllClients());

		// when a team is selected we start the team client
		this.teamSrv.teamSelectionEvent$.pipe(
			distinctUntilChanged((x, y) => x && y && x.id !== y.id),
			switchMap(team => this.startOrDestroyTeamClient(team)),
			// we need to reset list page to not have data from other team in cache
			tap(_ => ListPageService.reset())
		).subscribe(_ => this.isSpinnerShown$.next(false));
	}

	private startBaseClients(): Observable<Client[]> {
		const realmUser = this.realmAuthSrv.realmUser;
		// when we are authenticated it means we have a token
		return forkJoin([
			this.globalDataClient.init(realmUser),
			this.globalRequestClient.init(realmUser),
			this.userClient.init(realmUser)
		]);
	}

	private startOrDestroyTeamClient(team: Team) {
		const realmUser = this.realmAuthSrv.realmUser;
		if (team)
			return this.teamClient.init(realmUser, team);
		else
			return of(this.teamClient.destroy('no team selected'));
	}

	private destroyAllClients() {
		const reason = 'unauthenticated';
		this.globalDataClient.destroy(reason);
		this.globalRequestClient.destroy(reason);
		this.userClient.destroy(reason);
		this.teamClient.destroy(reason);
	}


}
