import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TagManagememtService } from '~features/data-management/services/tag-management.service';
import { ERM, Tag } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';

@Component({
	selector: 'app-tag-data-management-page',
	templateUrl: './../data-management-page/data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SelectionService]
})
export class TagDataManagementPageComponent extends ListPageComponent<Tag, TagManagememtService> {

	constructor(
		protected router: Router,
		protected featureSrv: TagManagememtService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService
	) {
		super(router, featureSrv, selectionSrv, undefined, dlgSrv, ERM.TAG, DialogName.NEW_TAG);
	}

}
