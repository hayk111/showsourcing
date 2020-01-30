import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { from, Observable, ReplaySubject } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { Team } from '~core/erm/models';
import { TeamQueries } from '~core/erm/services/team/team.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { LocalStorageService } from '~core/local-storage';



// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {


	/** event the team selected at the moment of the selection */
	private _teamSelectionEvent$ = new ReplaySubject<Team>(1);
	teamSelectionEvent$ = this._teamSelectionEvent$.asObservable().pipe(
		shareReplay(1),
	);
	// the team selection event is not a subscription to the team selected.
	// here we want a subscription so we can display changes in the view
	teamSelected$ = this.teamSelectionEvent$.pipe(
		// since
		filter(team => !!team),
		// yes we already have the team but we need a subscription :)
		switchMap(team => this.selectOne(team.id)),
		shareReplay(1)
	);

	// since the owwnerUser field is empty on the User realm, we need this observable in order to
	// identify on settings/team, limits on the contributors and team members
	teamSelectedTeamRealm$ = this.teamSelectionEvent$.pipe(
		filter(team => !!team),
		switchMap(team => this.selectOne(team.id, '')),
		shareReplay(1)
	);

	hasTeamSelected$ = this._teamSelectionEvent$.asObservable().pipe(
		map(team => !!team)
	);
	// synchronous version for easy access
	selectedTeamSync: Team;

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
		private http: HttpClient,
	) { super(TeamQueries, 'team', 'teams'); }

	init() {

		this.authSrv.signIn$.pipe(
			map(_ => this.getSelectedTeam())
		).subscribe(this._teamSelectionEvent$);

		// when logging out let's clear the current selected team
		this.authSrv.signOut$.subscribe(_ => this.resetSelectedTeam());

		// putting a sync version of team
		this.teamSelectionEvent$.subscribe(team => this.selectedTeamSync = team);
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return this.http.post('api/team', { name: team.name, companyId: team.company.id });
	}

	update(team: Team) {
		return this.http.patch<Team>(`api/team/${team.id}`, team);
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.resetSelectedTeam();
		this.storage.setItem(SELECTED_TEAM, team);
		this._teamSelectionEvent$.next(team);
		return this.teamSelectionEvent$.pipe(
			filter(x => !!x),
			first()
		);
	}

	selectTeam() {
		return this.teamSelected$;
	}

	private getSelectedTeam() {
		return this.storage.getItem(SELECTED_TEAM);
	}

	resetSelectedTeam() {
		this.storage.remove(SELECTED_TEAM);
		this._teamSelectionEvent$.next(undefined);
	}

	get idSync() {
		return this.selectedTeamSync.id;
	}

	// TODO amplify remove this
	queryAll() {
		throw Error('switch to global');
		const gql = this.queryBuilder.queryAll('id, name');
		return from(API.graphql(
			graphqlOperation(gql)
			)).pipe(
			tap(d => { debugger; })
		) as Observable<any>;
	}

}

