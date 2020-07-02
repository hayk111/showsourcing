import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { GlobalService } from '~core/erm';
import { ListHelper2Service } from '~core/list-page2';
import { EntityMetadata } from '~core/erm';
import { AutoUnsub, StatusCategory } from '~utils';

export abstract class AbstractStatusWorkflowComponent<T, G extends GlobalService<T>> extends AutoUnsub implements OnInit {

	constructor(
		protected statusSrv: G,
		public listHelper: ListHelper2Service,
		public dialogCommonSrv: DialogCommonService,
		public entityMetadata: EntityMetadata
	) {
		super();
	}

	ngOnInit() {
		// this.listHelper.setup('');
	}

	create() {
		this.listHelper.data$.pipe(first()).subscribe(items => {
			this.listHelper.openCreationDialog({ step: items.length + 1, category: StatusCategory.PREPARATION }); // default category
		});
	}
}
