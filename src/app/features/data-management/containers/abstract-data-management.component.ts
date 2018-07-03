import { Router } from '@angular/router';
import { GlobalServiceInterface } from '~global-services/_global/global.service';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { MergeDialogComponent } from '~shared/generic-dialog';
import { FilterService } from '~shared/filters';

export abstract class AbstractDataManagementComponent<T extends { id: string },
	G extends GlobalServiceInterface<T>> extends ListPageComponent<T, G> {

	constructor(
		protected router: Router,
		protected featureSrv: G,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
		public entityMetadata: EntityMetadata
	) {
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, entityMetadata);
	}

	mergeSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		this.dlgSrv.open(MergeDialogComponent, { type: this.entityMetadata, entities: items });
	}
}
