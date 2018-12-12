import { Injectable } from '@angular/core';
import { EntityMetadata } from '~core/models';
import { CommonModalService } from '~common/modals';



@Injectable({ providedIn: 'root' })
export class DataManagementService {

	constructor(private commonModalSrv: CommonModalService) { }

	merge(ids: string[], entityMetadata: EntityMetadata) {
		this.commonModalSrv.openMergeDialog({
			type: entityMetadata,
			entities: ids
		});
	}
}
