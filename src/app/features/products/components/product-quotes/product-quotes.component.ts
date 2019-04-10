import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestElementService } from '~core/entity-services';
import { RequestElement } from '~core/models';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'app-product-quotes',
	templateUrl: './product-quotes.component.html',
	styleUrls: ['./product-quotes.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductQuotesComponent implements OnInit {

	requestElements$: Observable<RequestElement[]>;

	constructor(
		private requestElementSrv: RequestElementService,
		private dlgSrv: DialogService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		const productId = this.route.parent.snapshot.params.id;
		this.requestElements$ = this.requestElementSrv.queryMany({ query: `targetedEntityType == "Product" && targetId == "${productId}"` });
	}

	openReviewDlg(elem: RequestElement) {
		// this.dlgSrv.open(RequestReviewComponent, {})
	}
}
