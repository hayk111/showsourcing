import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Observable, ReplaySubject, Subject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { TokenService } from '~features/auth/services/token.service';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { Team } from '~models/team.model';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { USER_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { AbstractInitializer } from '~shared/apollo/services/initializers/abstract-initializer.class';
import { ClientInitializerQueries } from '~shared/apollo/services/initializers/initializer-queries';
import { LocalStorageService } from '~shared/local-storage';
import { log } from '~utils/log';

const SELECTED_TEAM_ID = 'selected-team-id';

@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractInitializer {

	private _selectedTeamId$ = new ReplaySubject<string>(1);
	private _selectedTeam$ = new Subject<Team>();
	selectedTeam$ = this._selectedTeam$.asObservable().pipe(shareReplay(1));
	teams$: Observable<Team[]>;

	constructor(
		protected apollo: Apollo,
		protected tokenSrv: TokenService,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		private storage: LocalStorageService,
		private router: Router,
		private wrapper: ApolloWrapper
	) {
		super(apollo, tokenSrv, link, authSrv, true);
	}

	init() {
		this.restoreSelectedTeam();

		// 1. when the user client is ready we get the user's teams
		this.teams$ = this.apolloState.userClientReady$.pipe(
			filter(ready => !!ready),
			// we want to recheck only when the list of team change, not when one is mutated
			// therefor we can check if ids in both teams are the same.
			// usually the order won't change so this check should be enough
			distinctUntilChanged(),
			switchMap(_ => this.selectAll()),
		);


		// 2. When we have teams we find out what the selected team is
		combineLatest(
			this._selectedTeamId$,
			this.teams$,
			(id, teams) => this.getSelectedTeam(id, teams)
		).subscribe(this._selectedTeam$);

		// when the the user has selected a team we initialize the team client
		this.selectedTeam$
			.pipe(
				// if the team is null then we should do nothing because we are already redirecting in getSelectedTeam
				filter(t => !!t),
				distinctUntilChanged((x, y) => x.id === y.id)
			).subscribe(team => this.initTeamClient(team));
	}

	/** initialize apollo team client */
	private async initTeamClient(team: Team) {
		try {
			// we first clear the last team picked cache
			this.clearClient();
			const realm = await this.getRealm(team.realmServerName);
			const uris = this.getUris(realm.httpsPort, realm.hostname, team.realmPath);
			this.createClient(uris.httpUri, uris.wsUri);
			this.apolloState.setTeamClientReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setTeamClientNotReady();
		}
	}

	/** restore from local storage   */
	private restoreSelectedTeam() {
		const selectedTeamId: string = this.storage.getItem(SELECTED_TEAM_ID);
		this._selectedTeamId$.next(selectedTeamId);
	}

	private getSelectedTeam(selectedId: string, teams: Team[]) {
		if (!selectedId) {
			this.router.navigate(['user', 'pick-a-team']);
			return;
		}
		// if the user has selected a team during the current session
		let teamSelected;
		if (teamSelected = teams.find(team => team.id === selectedId)) {
			return teamSelected;
			// if not we redirect the user so he can pick a team
		} else if (teams.length > 0) {
			this.router.navigate(['user', 'pick-a-team']);
			// if there are no team we redirect the user to a page that lets him create a team
		} else {
			this.router.navigate(['user', 'create-a-team']);
		}
	}

	selectAll() {
		return this.wrapper.use(USER_CLIENT).selectMany({
			gql: ClientInitializerQueries.allTeams
		});
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM_ID, team.id);
		this._selectedTeamId$.next(team.id);
		return this._selectedTeam$;
	}
}
