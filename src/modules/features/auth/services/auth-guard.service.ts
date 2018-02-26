import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectAuthentication } from '~store/selectors/misc/authentication.selector';

// TODO remove those statements APP wide when made available.
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
	constructor(private store: Store<any>, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return (
			this.store
				.select(selectAuthentication)
				.map(auth => auth.authenticated)
				// we need to filter the authstate when it's null because that means we don't know yet
				.filter(authenticated => authenticated !== null)
				.do(authenticated => this.redirectOnAuth(authenticated))
		);
	}

	redirectOnAuth(authenticated: boolean) {
		if (!authenticated) this.router.navigate(['login']);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}
