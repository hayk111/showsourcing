import { OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { GlobalService } from '~core/entity-services/_global/global.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { EntityMetadata } from '~core/models';
import { first } from 'rxjs/operators';

export abstract class AbstractStatusWorkflowComponent<T, G extends GlobalService<T>> implements OnInit {

	constructor(
		private statusSrv: G,
		public listSrv: ListPageService<T, G>,
		public commonModalSrv: CommonModalService,
		public pageKey: ListPageKey,
		public entityMetadata: EntityMetadata
	) { }

	ngOnInit() {
		this.listSrv.setup({
			key: this.pageKey,
			entitySrv: this.statusSrv,
			selectParams: { sortBy: 'step', descending: false },
			entityMetadata: this.entityMetadata
		});
	}

	create() {
		this.listSrv.items$.pipe(first()).subscribe(items => {
			this.listSrv.create(false, { step: items.length + 1, category: 'inProgress' });
		});
	}
}
