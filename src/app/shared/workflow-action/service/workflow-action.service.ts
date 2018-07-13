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

	getStatus(typeStatus: EntityMetadata) {
		return this.ermSrv.getGlobalService(typeStatus).selectAll('id, name, color, contrastColor, step, final');
	}
}
