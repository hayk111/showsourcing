import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { TagService } from '~core/entity-services';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ERM, Tag } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'tag-data-page-app',
	templateUrl: '../shared/data-management-template.html',
	styleUrls: ['./tag-data-page.component.scss', '../sared/data-management-styles.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class TagDataPageComponent extends AutoUnsub implements OnInit {
	erm = ERM.TAG;

	addButtonWidth = '111px';
	addButtonHeight = '32px';

	selectItemsConfig: SelectParamsConfig;

	constructor(
		private tagSrv: TagService,
		public listSrv: ListPageService<Tag, TagService>,
		public commonModalSrv: CommonModalService) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.tagSrv,
			searchedFields: ['name'],
			selectParams: { sortBy: 'name', descending: false, query: 'deleted == false' },
			entityMetadata: this.erm,
			originComponentDestroy$: this._destroy$
		});
	}

	mergeSelected() {
		const tags = this.listSrv.getSelectedValues();
		this.commonModalSrv.openMergeDialog({
			type: this.listSrv.entityMetadata,
			entities: tags
		});
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
