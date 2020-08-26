import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product } from '~core/erm';
import { FilterService } from '~core/filters';
import { isUuid } from '~utils/uuid.utils';
import { ListPageViewService, SelectionService } from '~core/list-page2';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';
import { TrackingComponent } from '~utils/tracking-component';
import { api } from 'showsourcing-api-lib';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListHelper2Service,
		SelectionService,
		FilterService
	]
})
export class SamplesPageComponent extends AutoUnsub implements OnInit {
	private productId: string;
	product: Product;

	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		public listHelper: ListHelper2Service,
		public viewSrv: ListPageViewService<any>,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		private location: Location,
	) {
		super();
	}
	ngOnInit() {
		this.productId = this.route.snapshot?.params?.id ||
			this.location.path().split('/').find((val: string) => isUuid(val));
		this.product = { id: this.productId };
		this.listHelper.setup(
			'Sample',
			this._destroy$,
			(options) => api.Sample.findByProduct$(this.productId)
		);
	}
}
