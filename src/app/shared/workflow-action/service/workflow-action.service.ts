import { Injectable } from '@angular/core';
import { ERMService } from '~global-services/_global/erm.service';
import { EntityMetadata } from '~models';
import { first } from '../../../../../node_modules/rxjs/operators';
import { AutoUnsub } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class WorkflowActionService {

	constructor(
		private ermSrv: ERMService
	) { }

	getTableStatus(typeEntity: EntityMetadata) {
		return this.ermSrv.getStatusService(typeEntity).selectAll('id, name, color, contrastColor, step, final');
	}

	updateStatus(entity, typeEntity: EntityMetadata) {
		return this.ermSrv.getGlobalService(typeEntity).update(entity);
	}
}
