import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * The service is used whenever some entities are not being shown by the list service
 * @service ExcludedService
 */
@Injectable({
	providedIn: 'root'
})
export class ExcludedService {
	private _valueChanges = new BehaviorSubject<any>(this);
	valueChanges$ = this._valueChanges.asObservable();

	private _excludedIds = [];

	constructor() {}

	set excludedIds(ids: string[]) {
		this._excludedIds = ids;
		this._valueChanges.next(this);
	}

	get excludedIds(): string[] {
		return this._excludedIds;
	}

}
