import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentTarget } from '../selectors/target/current-target.selector';

@Injectable()
export class TargetService {

	constructor(private store: Store<any>) { }

	getTarget() {
		return this.store.select(selectCurrentTarget);
	}

}
