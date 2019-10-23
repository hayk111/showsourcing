import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { GlobalService } from '~core/entity-services/_global/global.service';
import { ListPageService } from '~core/list-page';
import { EntityMetadata } from '~core/models';
import { DEFAULT_STATUS_CATEGORY } from '~core/models/status.model';
import { AutoUnsub } from '~utils';

export abstract class AbstractStatusWorkflowComponent<T, G extends GlobalService<T>> extends AutoUnsub implements OnInit {

	constructor(
		protected statusSrv: G,
		public listSrv: ListPageService<T, G>,
		public commonModalSrv: CommonModalService,
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
			this.listSrv.create(false, { step: items.length + 1, category: DEFAULT_STATUS_CATEGORY }); // default category
		});
	}
}
