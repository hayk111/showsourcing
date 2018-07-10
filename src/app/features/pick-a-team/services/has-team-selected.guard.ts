import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { debug, log, LogColor } from '~utils';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';

@Injectable({
	providedIn: 'root'
})
export class HasTeamSelectedGuard implements CanActivate, CanActivateChild {

	constructor(private teamPicker: TeamPickerService, private router: Router) { }

	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.teamPicker.hasTeamSelected$.pipe(
			tap(d => log.debug('%c hasTeamGuard selected', LogColor.GUARD, d)),
			tap(hasTeam => this.redirect(hasTeam))
		);
	}

	redirect(hasTeam: boolean) {
		if (!hasTeam) {
			this.router.navigate(['user', 'pick-a-team']);
		}
	}

}
