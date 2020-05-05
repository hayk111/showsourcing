
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
