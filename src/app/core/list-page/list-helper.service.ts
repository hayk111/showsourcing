import { Injectable } from '@angular/core';
import { SelectionService } from './selection.service';
import { ApiService } from '~core/erm3/services/api.service';
import { FilterService } from '~shared/filters/services/filter.service';
import { switchMap } from 'rxjs/operators';
import { EntityName } from '~core/erm';



@Injectable({ providedIn: 'root' })
export class ListHelperService {

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	getFilteredItems$(entityName: EntityName) {
		return this.filterSrv.valueChanges$.pipe(
			switchMap(filters => this.apiSrv.queryMany(entityName))
		);
	}
}
