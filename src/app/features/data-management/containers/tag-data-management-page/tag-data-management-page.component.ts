import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { TagService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { ERM, Tag } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'tag-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TagDataManagementPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.TAG;

	constructor(
		private tagSrv: TagService,
		public listSrv: ListPageService<Tag, TagService>,
		public commonModalSrv: CommonModalService,
		private dmSrv: DataManagementService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.TAG,
			entitySrv: this.tagSrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false, query: 'deleted == false' },
			entityMetadata: this.erm,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const ids = this.listSrv.getSelectedIds();
		this.dmSrv.merge(ids, this.listSrv.entityMetadata);
	}
}
