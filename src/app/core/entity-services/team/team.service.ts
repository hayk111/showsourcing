import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, shareReplay, switchMap, first } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { LocalStorageService } from '~core/local-storage';
import { GlobalService } from '~entity-services/_global/global.service';
import { TeamQueries } from '~entity-services/team/team.queries';
import { Team } from '~models';

// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {

	defaultClient = Client.USER;

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

	hasTeamSelected$ = this._teamSelectionEvent$.asObservable().pipe(
		map(team => !!team)
	);
	// synchronous version for easy access
	selectedTeamSync: Team;

	constructor(
		protected apolloState: ApolloStateService,
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService

	) { super(apolloState, TeamQueries, 'team', 'teams'); }

	init() {

		this.authSrv.authenticated$.pipe(
			map(_ => this.getSelectedTeam())
		).subscribe(this._teamSelectionEvent$);

		// when logging out let's clear the current selected team
		this.authSrv.notAuthenticated$.subscribe(_ => this.resetSelectedTeam());

		// putting a sync version of team
		this.teamSelectionEvent$.subscribe(team => this.selectedTeamSync = team);
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return super.create(team).pipe(
			switchMap(_ => this.waitForOne(`id == "${team.id}" AND status == "active"`)),
			switchMap(_team => this.pickTeam(_team))
		);
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM, team);
		this._teamSelectionEvent$.next(team);
		return this.teamSelectionEvent$.pipe(
			filter(x => !!x),
			first()
		);
	}

	private getSelectedTeam() {
		return this.storage.getItem(SELECTED_TEAM);
	}

	resetSelectedTeam() {
		this.storage.remove(SELECTED_TEAM);
		this._teamSelectionEvent$.next(undefined);
	}

}

