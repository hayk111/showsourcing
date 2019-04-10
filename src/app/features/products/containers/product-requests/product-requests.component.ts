import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestElementService } from '~core/entity-services';
import { RequestElement } from '~core/models';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'product-requests-app',
	templateUrl: './product-requests.component.html',
	styleUrls: ['./product-requests.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestsComponent implements OnInit {

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
