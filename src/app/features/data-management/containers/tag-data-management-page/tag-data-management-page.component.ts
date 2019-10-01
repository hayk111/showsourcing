import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { TagService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { DataManagementService } from '~features/data-management/services/data-management.service';
import { ERM, Tag } from '~models';
import { AutoUnsub } from '~utils';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';

@Component({
	selector: 'tag-data-management-page-app',
	templateUrl: './../data-management-page.component.html',
	styleUrls: ['./tag-data-management-page.component.scss', '../data-management-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TagDataManagementPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.TAG;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private tagSrv: TagService,
		public listSrv: ListPageService<Tag, TagService>,
		public commonModalSrv: CommonModalService,
		private dmSrv: DataManagementService) {
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
		const tags = this.listSrv.getSelectedValues();
		this.dmSrv.merge(tags, this.listSrv.entityMetadata);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
