import { Injectable } from '@angular/core';
import { EntityMetadata } from '~core/models';
import { CommonDialogService } from '~common/dialog';



@Injectable({ providedIn: 'root' })
export class DataManagementService {

	constructor(private commonDlgSrv: CommonDialogService) { }

	merge(ids: string[], entityMetadata: EntityMetadata) {
		this.commonDlgSrv.openMergeDialog({
			type: entityMetadata,
			entities: ids
		});
	}
}
