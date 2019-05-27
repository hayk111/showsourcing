import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { CommonModalService } from '~common/modals';
import { RequestElementService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, RequestElement } from '~core/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-requests-app',
	templateUrl: './product-requests.component.html',
	styleUrls: ['./product-requests.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestsComponent extends AutoUnsub implements OnInit {

	constructor(
		private requestElementSrv: RequestElementService,
		private route: ActivatedRoute,
		public listSrv: ListPageService<RequestElement, RequestElementService>,
		public commonModalSrv: CommonModalService
	) { super(); }

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.subscribe(id => {
			this.listSrv.setup({
				key: `${ListPageKey.REQUEST_ELEMENT}-${id}`,
				entitySrv: this.requestElementSrv,
				selectParams: { sortBy: 'name', query: `targetedEntityType == "Product" && targetId == "${id}"` },
				entityMetadata: ERM.REQUEST_ELEMENT,
				searchedFields: [],
				originComponentDestroy$: this._destroy$
			});
		});
	}

}
