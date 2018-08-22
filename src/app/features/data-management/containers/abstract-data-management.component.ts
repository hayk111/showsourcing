import { Router } from '@angular/router';
import { GlobalServiceInterface } from '~global-services/_global/global.service';
import { EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { MergeDialogComponent } from '~shared/custom-dialog';
import { SearchService } from '~shared/filters';
import { NgModuleRef } from '@angular/core';

export abstract class AbstractDataManagementComponent<T extends { id?: string },
	G extends GlobalServiceInterface<T>> extends ListPageComponent<T, G> {

	constructor(
		protected router: Router,
		protected featureSrv: G,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>,
		public entityMetadata: EntityMetadata
	) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, entityMetadata);
	}

	mergeSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		this.dlgSrv.openFromModule(MergeDialogComponent, this.moduleRef, { type: this.entityMetadata, entities: items });
	}
}
