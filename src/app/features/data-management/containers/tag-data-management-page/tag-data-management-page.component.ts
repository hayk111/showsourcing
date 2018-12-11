import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { TagService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { ERM, Tag } from '~models';

@Component({
	selector: 'tag-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TagDataManagementPageComponent implements OnInit {
	erm = ERM.TAG;

	constructor(
		private tagSrv: TagService,
		public listSrv: ListPageService<Tag, TagService>,
		public commonDlgSrv: CommonDialogService,
		private dmSrv: DataManagementService
	) {
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.TAG,
			entitySrv: this.tagSrv,
			searchedFields: ['name'],
			currentSort: { sortBy: 'name', descending: true },
			entityMetadata: this.erm
		});
	}

	mergeSelected() {
		const ids = this.listSrv.getSelectedIds();
		this.dmSrv.merge(ids, this.listSrv.entityMetadata);
	}
}
