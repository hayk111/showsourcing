import { Injectable } from '@angular/core';
import { Typename } from 'showsourcing-api-lib';

@Injectable({
	providedIn: 'root'
})
export class GlobalUnitsService {
	typename: Typename;

	constructor() { }

	setup(typename: Typename) {
		this.typename = typename;
	}

	isGlobalEntity() {
	}
}
