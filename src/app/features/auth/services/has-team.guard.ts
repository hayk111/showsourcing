import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApiService } from '~core/erm3/services/api.service';
import { EntityName } from '~core/erm';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuard implements CanActivate, CanActivateChild {

	constructor(private apiSrv: ApiService, private router: Router) { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.apiSrv.queryAll(EntityName.TEAM).data$.pipe(
			tap(d => log.debug('%c hasTeamGuard', LogColor.GUARD, d)),
			map(teams => teams.length > 0),
			tap(hasTeam => this.redirect(hasTeam, route, state))
		);
	}

	redirect(hasTeam: boolean, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!hasTeam) {
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['auth', 'user', 'create-a-team'], { queryParams: { returnUrl } });
		}
	}

}
