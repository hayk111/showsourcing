import { Injectable } from '@angular/core';
import { LengthUnit } from '~core/erm/models';
import { GlobalService } from '../_global/global.service';
import { LengthUnitQueries } from './length-unit.queries';


@Injectable({
	providedIn: 'root'
})
export class LengthUnitService extends GlobalService<LengthUnit> {


	constructor() {
		super(LengthUnitQueries, 'lengthUnit', 'lengthUnits');
	}

}
