import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProjectProductService {
	private _productsListRefetch = new Subject<undefined>();
	productsListRefetch$ = this._productsListRefetch.asObservable();

	constructor() { }

	refetch() {
		this._productsListRefetch.next();
	}
}
