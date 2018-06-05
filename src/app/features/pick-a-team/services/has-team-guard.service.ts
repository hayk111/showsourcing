import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { TokenService } from '~features/auth';
import { ApolloClient } from '~shared/apollo';
import { filter, switchMap, map, tap, catchError } from 'rxjs/operators';
import { PickATeamService } from '~features/pick-a-team/services/pick-a-team.service';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuard implements CanActivate, CanActivateChild {


	constructor(private srv: PickATeamService, private router: Router, private apollo: ApolloClient) { }

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.apollo.userClientReady$.pipe(
			filter(ready => ready !== null),
			switchMap(_ => this.srv.getTeams()),
			map(teams => teams.length),
			map(length => length > 0),
			tap(v => this.redirect(v))
		);
	}

	private redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['user', 'pick-a-team']);
		}
	}

}
