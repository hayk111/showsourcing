import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { forkJoin, Observable, combineLatest } from 'rxjs';
import { switchMap, tap, distinctUntilChanged, first, mergeMap, map } from 'rxjs/operators';
import { TeamClientInitializer, UserClientInitializer, ApolloStateService, ClientStatus } from '~core/apollo/services';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { GlobalDataClientsInitializer } from '~core/apollo/services/apollo-global-data-client.service';
import { TokenService } from '~core/auth';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { ListPageService } from '~core/list-page';
import { CompanyService, TeamService } from '~entity-services';
import { Team } from '~models';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	spinner = false;

	constructor(
		private authSrv: AuthenticationService,
		private globalDataClient: GlobalDataClientsInitializer,
		private userClient: UserClientInitializer,
		private teamClient: TeamClientInitializer,
		private teamSrv: TeamService,
		private companySrv: CompanyService,
		private tokenSrv: TokenService,
		private apolloState: ApolloStateService
	) { }

	ngOnInit(): void {
		this.setEnvironmentUrls();

		this.authSrv.init();
		this.teamSrv.init();
		this.companySrv.init();

		const hasTeam$ = this.teamSrv.hasTeamSelected$;
		const teamClientStatus$ = this.apolloState.getClientStatus(Client.TEAM);
		// we only want the loader to appear when we have a team selected and the team client status is pending
		combineLatest(
			hasTeam$,
			teamClientStatus$,
			(hasTeam, teamClientStatus) => hasTeam && teamClientStatus === ClientStatus.PENDING
		).subscribe(show => this.spinner = show);
		// when authenticated we start the required clients
		this.authSrv.authenticated$.pipe(
			switchMap(_ => this.startBaseClients())
		).subscribe();

		// when logging off we destroy all clients
		this.authSrv.notAuthenticated$
			.subscribe(_ => this.destroyAllClients());

		// when a team is selected we start the team client
		this.teamSrv.teamSelected$.pipe(
			switchMap(team => this.startTeamClient(team) as any),

			// we need to reset list page to not have data from other team in cache
			tap(_ => ListPageService.reset())
		).subscribe(_ => this.spinner = false);

	}

	private startBaseClients(): Observable<Client[]> {
		// when we are authenticated it means we have a token
		const realmUser = this.tokenSrv.realmUser;
		return forkJoin([
			this.globalDataClient.init(realmUser),
			this.userClient.init(realmUser)
		]);
	}

	private startTeamClient(team: Team) {
		const realmUser = this.tokenSrv.realmUser;
		return this.teamClient.init(realmUser, team);
	}

	private destroyAllClients() {
		const reason = 'unauthenticated';
		this.globalDataClient.destroy(reason);
		this.userClient.destroy(reason);
		this.teamClient.destroy(reason);
	}

	/** changes urls in environment based on query params */
	protected setEnvironmentUrls() {
		const urlParams = new URLSearchParams(window.location.search);
		const ros = urlParams.get('ros');
		if (ros) {
			environment.graphqlUrl = `wss://${ros}.showsourcing.com/graphql`;
			environment.graphqlAuthUrl = `https://${ros}.showsourcing.com/auth`;
			environment.apiUrl = `https://${ros}.showsourcing.com`;
		}
	}
}
