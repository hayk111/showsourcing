import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TagManagememtService } from '~features/data-management/services/tag-management.service';
import { ERM, Tag } from '~models';
import { DialogService } from '~shared/dialog';
import { CreationDialogComponent } from '~shared/generic-dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { FilterService } from '~shared/filters';
import { StoreKey } from '~utils';

@Component({
	selector: 'tag-data-management-page-app',
	templateUrl: './../data-management-page/data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_TAG },
		SelectionService]
})
export class TagDataManagementPageComponent extends ListPageComponent<Tag, TagManagememtService> {

	constructor(
		protected router: Router,
		protected featureSrv: TagManagememtService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, undefined, dlgSrv, ERM.TAG, CreationDialogComponent);
	}

	renameEntity(tagId: string) {

	}

}
