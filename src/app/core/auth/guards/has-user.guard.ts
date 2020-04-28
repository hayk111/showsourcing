
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { AuthStatus } from '../services/auth-state.interface';
import { UserService } from '../services';

@Injectable({
	providedIn: 'root'
})
export class HasUserGuard implements CanActivate, CanActivateChild {
	hasUser$ = this.userSrv.user$.pipe(
		map(user => !!user)
	);

	constructor(private userSrv: UserService) { }

	canActivate(): Observable<boolean> {
		return this.hasUser$;
	}

	canActivateChild(): Observable<boolean> {
		return this.hasUser$;
	}
}
