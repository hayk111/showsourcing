import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap, distinctUntilChanged } from 'rxjs/operators';
import { TeamService } from '../../../global-services';
import { log, LogColor } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class HasTeamSelectedGuard implements CanActivate, CanActivateChild {

	constructor(private teamSrv: TeamService, private router: Router) { }

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamSrv.hasTeamSelected$.pipe(
			tap(d => log.debug('%c hasTeamGuard selected', LogColor.GUARD, d)),
			distinctUntilChanged(),
			tap(hasTeam => this.redirect(hasTeam))
		);
	}

	redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['user', 'pick-a-team']);
		}
	}

}
