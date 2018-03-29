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
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { Log } from '~app/app-root/utils';
import { selectAuthStatus } from '~app/features/auth/store';
import { selectUser, User } from '~app/entity';

// TODO remove those statements APP wide when made available.
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
	constructor(private store: Store<any>, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		Log.debug('check auth');
		return this.store.select<any>(selectAuthStatus).pipe(
			// we need to filter the authstate when it's pending because that means we don't know yet
			filter(authStatus => !authStatus.pending),
			map(authStatus => authStatus.authenticated),
			tap(authenticated => this.redirectOnAuth(authenticated)));
	}

	redirectOnAuth(authenticated: boolean) {
		if (!authenticated) this.router.navigate(['guest', 'login']);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}
