import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '~features/auth';
import { ApolloClient } from '~shared/apollo';
import { filter, switchMap, map } from 'rxjs/operators';
import { HasTeamQueries } from '~features/pick-a-team/services/has-team.queries';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuardService implements CanActivate, CanActivateChild {


	constructor(private apollo: ApolloClient) { }

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.apollo.clientReady$.pipe(
			filter(ready => ready !== null),
			switchMap(_ => this.apollo.query({ query: HasTeamQueries.getTeams }).valueChanges),
			map((r: any) => r.data.teams.length),
			map(length => length > 0)
		);
	}

}
