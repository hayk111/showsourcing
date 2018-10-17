import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { OnBoardingService } from './on-boarding.service';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class ProcessStartedGuard implements CanActivate {

	constructor(private onboardingSrv: OnBoardingService, private router: Router) { }

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		const started = this.onboardingSrv.initialized;
		this.redirect(started);
		return started;
	}

	redirect(initialized) {
		if (!initialized) {
			return this.router.navigate(['welcome']);
		}
	}
}
