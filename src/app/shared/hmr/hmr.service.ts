import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

@Injectable()
export class HmrService {
	constructor(private store: Store<any>) {}

	public isStoreLoaded(): boolean {
		let state: any;
		this.store.take(1).subscribe(s => (state = s));
		return state.hmr;
	}
}
