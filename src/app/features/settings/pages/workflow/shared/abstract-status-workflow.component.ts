import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { GlobalService } from '~core/entity-services/_global/global.service';
import { ListPageService } from '~core/list-page';
import { EntityMetadata } from '~core/models';
import { AutoUnsub, StatusCategory } from '~utils';

export abstract class AbstractStatusWorkflowComponent<T, G extends GlobalService<T>> extends AutoUnsub implements OnInit {

	constructor(
		protected statusSrv: G,
		public listSrv: ListPageService<T, G>,
		public dialogCommonSrv: DialogCommonService,
		public entityMetadata: EntityMetadata
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.statusSrv,
			selectParams: { sortBy: 'step', descending: false, query: 'deleted == false' },
			entityMetadata: this.entityMetadata,
			originComponentDestroy$: this._destroy$
		});
	}

	create() {
		this.listSrv.items$.pipe(first()).subscribe(items => {
			this.listSrv.create(false, { step: items.length + 1, category: StatusCategory.PREPARATION }); // default category
		});
	}
}
