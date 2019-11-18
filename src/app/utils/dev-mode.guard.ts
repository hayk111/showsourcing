import { Injectable, isDevMode } from '@angular/core';
import { CanLoad, UrlSegment, Route, CanActivate, CanActivateChild } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class DevModeGuard implements CanLoad, CanActivate, CanActivateChild {
	canLoad(route: Route, segments: UrlSegment[]): boolean {
		return isDevMode();
	}

	canActivate() {
		return isDevMode();
	}

	canActivateChild() {
		return isDevMode();
	}

}
