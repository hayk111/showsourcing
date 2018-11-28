import { Injectable, isDevMode } from '@angular/core';
import { CanLoad, UrlSegment, Route } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class DevModeGuard implements CanLoad {
	canLoad(route: Route, segments: UrlSegment[]): boolean {
		return isDevMode();
	}
}
