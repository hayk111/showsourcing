import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { TeamService } from '~core/auth/services/team.service';
import { log } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class HasTeamSelectedGuard implements CanActivate, CanActivateChild {

	constructor(private teamSrv: TeamService, private router: Router) { }

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamSrv.teamSelected$.pipe(
			map(team => !!team),
			tap(team => this.redirect(team, route, state))
		);
	}

	redirect(hasTeamSelected: boolean, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		log.debug(`has team selected guard -> ${hasTeamSelected}`);
		if (!hasTeamSelected) {
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['auth', 'user', 'pick-a-team'], { queryParams: { returnUrl } });
		}
	}

}
