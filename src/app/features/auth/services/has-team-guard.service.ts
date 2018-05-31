import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HasTeamGuardService implements CanActivate, CanActivateChild {


	constructor(private) { }

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		throw new Error('Method not implemented.');
	}

}
