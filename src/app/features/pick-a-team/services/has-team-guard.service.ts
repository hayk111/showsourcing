import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { TokenService } from '~features/auth';
import { ApolloClient } from '~shared/apollo';
import { filter, switchMap, map, tap, catchError } from 'rxjs/operators';
import { HasTeamQueries } from '~features/pick-a-team/services/has-team.queries';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuard implements CanActivate, CanActivateChild {


	constructor(private apollo: ApolloClient, private router: Router) { }

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.apollo.clientReady$.pipe(
			filter(ready => ready !== null),
			switchMap(_ => this.apollo.subscribe({ query: HasTeamQueries.getTeams })),
			map((r: any) => r.data.teams.length),
			map(length => length > 0)
		);
	}

	private redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['pick-a-team']);
		}
	}

}
