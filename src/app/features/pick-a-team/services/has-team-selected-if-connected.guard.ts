import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { TeamService, UserService } from '~global-services';
import { AuthenticationService } from '~features/auth/services/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class HasTeamSelectedIfConnectedGuard implements CanActivate, CanActivateChild {

	constructor(private teamSrv: TeamService, private userSrv: UserService,
		private authSrv: AuthenticationService, private location: Location, private router: Router) { }

	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.authSrv.userId$.pipe(
			switchMap(user => {
				if (user) { // Only check the selected team if authenticated
					return this.teamSrv.hasTeamSelected$.pipe(
						tap(d => log.debug('%c hasTeamGuard selected', LogColor.GUARD, d)),
						tap(hasTeam => this.redirect(hasTeam))
					);
				} else { // If not authenticated, activate the route
					return of(true);
				}
			})
		);
	}

	redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['user', 'pick-a-team'], { queryParams: { returnUrl: this.location.path() } });
		}
	}

}
