import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product } from '~core/erm';
import { FilterService } from '~core/filters';
import { ListPageViewService, SelectionService } from '~core/list-page2';
import { ListHelper2Service } from '~core/list-page2/list-helper-2.service';
import { TrackingComponent } from '~utils/tracking-component';

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
export class SamplesPageComponent extends TrackingComponent implements OnInit {
	private productId: string;
	product: Product;

	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		public listHelper: ListHelper2Service,
		public viewSrv: ListPageViewService<any>,
		public dialogCommonSrv: DialogCommonService,
		public selectionSrv: SelectionService,
		protected filterSrv: FilterService
	) {
		super();
	}
	ngOnInit() {
		this.productId = this.route.parent.snapshot.params.id;
		this.product = { id: this.productId };
		this.listHelper.setup('Sample', 'Product', this.productId);
	}
}
