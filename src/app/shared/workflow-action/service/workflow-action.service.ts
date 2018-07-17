import { Injectable } from '@angular/core';
import { ERMService } from '~global-services/_global/erm.service';
import { EntityMetadata } from '~models';

@Injectable({
	providedIn: 'root'
})
export class WorkflowActionService {

	constructor(
		private ermSrv: ERMService
	) { }

	getTableStatus(typeEntity: EntityMetadata) {
		return this.ermSrv.getStatusService(typeEntity).selectAll('id, name, color, contrastColor, step, inWorkflow');
	}

	updateStatus(entity, typeEntity: EntityMetadata) {
		return this.ermSrv.getGlobalService(typeEntity).update(entity);
	}
}
