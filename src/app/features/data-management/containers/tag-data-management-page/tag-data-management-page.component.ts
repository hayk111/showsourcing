import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataManagementComponent } from '~features/data-management/containers/abstract-data-management.component';
import { TagManagememtService } from '~features/data-management/services/tag-management.service';
import { ERM, Tag } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils';

@Component({
	selector: 'tag-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_TAG },
		SelectionService]
})
export class TagDataManagementPageComponent extends AbstractDataManagementComponent<Tag, TagManagememtService> {

	constructor(
		protected router: Router,
		protected featureSrv: TagManagememtService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, ERM.TAG);
	}
}