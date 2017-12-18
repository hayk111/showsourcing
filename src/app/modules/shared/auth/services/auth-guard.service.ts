import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
// TODO remove those statements APP wide when made available.
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import { selectAuthentication } from '../../../store/selectors/authentication.selector';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

	constructor(private store: Store<any>, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.store.select(selectAuthentication)
		.map(auth => auth.authenticated)
		// we need to filter the authstate when it's null because that means we don't know yet
		.filter(authenticated => authenticated !== null)
		.do(authenticated => this.redirectOnAuth(authenticated));
	}

	redirectOnAuth(authenticated: boolean) {
		if (!authenticated)
			this.router.navigate(['guest', 'login']);
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}
