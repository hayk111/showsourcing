import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '~entity-services';
import { map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class HasUserGuard implements CanActivate, CanActivateChild {
	constructor(private userSrv: UserService) { }
	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		return this.userSrv.selectUser().pipe(
			map(has => !!has)
		);
	}

	canActivateChild() {
		return this.canActivate();
	}
}
