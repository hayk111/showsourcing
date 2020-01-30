import { Injectable } from '@angular/core';
import { WeightUnit } from '~core/erm/models';
import { GlobalService } from '../_global/global.service';
import { WeightUnitQueries } from './weight-unit.queries';

@Injectable({
	providedIn: 'root'
})
export class WeightUnitService extends GlobalService<WeightUnit> {

	constructor() {
		super(WeightUnitQueries, 'weightUnit', 'weightUnits');
	}

}
