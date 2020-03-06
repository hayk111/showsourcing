import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { ApiService } from '~core/erm3/services/api.service';
import { LocalStorageService } from '~core/local-storage';
import { CompanyService } from './company.service';
import { TeamUser, Team } from '~core/erm3/models';

// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService {

	// we query all teamByUser to extract the team
	private queryAllTeamUsers = this.apiSrv.queryAll<TeamUser>('TeamUser');
	teamsOfUser$: Observable<Team[]> = this.queryAllTeamUsers.data$.pipe(
		map((teamUsers: TeamUser[]) => teamUsers.map(tu => tu.team))
	);
	hasTeam$ = this.teamsOfUser$.pipe(
		map(teams => teams.length > 0)
	);
	/** event the team selected at the moment of the selection */
	private _teamSelected$ = new ReplaySubject<Team>(1);
	// the team selection event might just be the team from the local storage
	// we do a query one after just to have it from the apollo cache to see changes
	teamSelected$ = this._teamSelected$.pipe(
		shareReplay(1)
	);

	hasTeamSelected$ = this._teamSelected$.pipe(
		map(team => !!team)
	);
	// synchronous version for easy access
	static _teamSelected: Team;

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
		protected companySrv: CompanyService,
		protected apiSrv: ApiService
	) {	}

	init() {
		// putting a sync version of team
		this._teamSelected$
			.subscribe(team => TeamService._teamSelected = team);
		// restoring the previously selected team
		this.restoreSelectedTeam();
		// when logging out let's clear the current selected team
		this.authSrv.signOut$.subscribe(_ => this.resetSelectedTeam());
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return this.apiSrv.create('Team', { companyId: this.companySrv.companySync.id, ...team })
			.pipe(switchMap(_ => this.queryAllTeamUsers.refetch()));
	}

	update(team: Team) {
		return this.apiSrv.update('Team', { companyId: this.companySrv.companySync.id, ...team });
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		this.storage.setItem(SELECTED_TEAM, team);
		this._teamSelected$.next(team);
		return this.teamSelected$.pipe(
			filter(x => !!x),
			first()
		);
	}

	restoreSelectedTeam() {
		const selectedTeam: Team = this.storage.getItem(SELECTED_TEAM);
		this._teamSelected$.next(selectedTeam);
	}

	resetSelectedTeam() {
		this.storage.remove(SELECTED_TEAM);
		this._teamSelected$.next(undefined);
	}

}

