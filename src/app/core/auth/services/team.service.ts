import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { LocalStorageService } from '~core/local-storage';
import { ApiLibService } from '~core/api-lib';
import { CompanyService } from './company.service';
import { TeamUser, Team } from '~core/erm3/models';
import { UserService } from './user.service';
import { customQueries } from '~core/erm3/queries/custom-queries';

// name in local storage
const SELECTED_TEAM = 'selected-team';

/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService {

	// TODO: implement list by team users
	// we query all teamByUser to extract the team
	// private queryAllTeamUsers = this.apiSrv.listBy<TeamUser>(
	// 	'TeamUser',
	// 	'User',
	// 	UserService.userId,
	// 	{ fetchPolicy: 'cache-and-network' }
	// );
	private queryAllTeamUsers = {data$: of(null)};
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
	static teamSelected: Team;

	constructor(
		protected storage: LocalStorageService,
		protected authSrv: AuthenticationService,
		protected companySrv: CompanyService,
		protected apiLibSrv: ApiLibService,
	) {	}

	init() {
		// putting a sync version of team
		this._teamSelected$
			.subscribe(team => {
				TeamService.teamSelected = team;
				// if (team)
				// 	this.apiSrv.setTeamId(team.id);
			});
		// restoring the previously selected team
		this.restoreSelectedTeam();
		// when logging out let's clear the current selected team
		this.authSrv.signOut$.subscribe(_ => this.resetSelectedTeam());
	}

	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return this.apiLibSrv.db.create('Team', [{ companyId: this.companySrv.companySync.id, ...team }])
			.pipe(
				// switchMap(_ => this.queryAllTeamUsers.refetch())
			);
	}

	update(team: Team) {
		return this.apiLibSrv.db.update('Team', [{ companyId: this.companySrv.companySync.id, ...team } as any]);
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

	getTeamById(id: string): Observable<any> {
		return of(null);
		// return this.apiSrv.query<Team>({
		// 	query: customQueries.getTeam,
		// 	variables: { id },
		// 	fetchPolicy: 'network-only'
		// }, false).data$;
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

