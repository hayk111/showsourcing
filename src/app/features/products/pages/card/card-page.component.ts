import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product } from '~core/erm';
import { FilterService, FilterType } from '~core/filters';
import { ListHelperService, ListPageViewService, SelectionService } from '~core/list-page2';
import { RatingService } from '~shared/rating/services/rating.service';


@Component({
	selector: 'card-page-app',
	templateUrl: './card-page.component.html',
	styleUrls: ['./card-page.component.scss'],
	providers: [
		ListHelperService,
		ListPageViewService,
		FilterService,
		SelectionService,
	],
	host: {
		class: 'table-page'
	}
})
export class CardPageComponent implements OnInit {
	items$: Observable<Product[]>;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PROJECTS,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.CATEGORY,
		FilterType.STATUS,
		FilterType.TAGS,
		FilterType.ARCHIVED,
		FilterType.FAVORITE
	];

	constructor(
		public listHelper: ListHelperService<Product>,
		public viewSrv: ListPageViewService<Product>,
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		public ratingSrv: RatingService
	) {}

	ngOnInit() {
		this.listHelper.setup('Product');
		this.viewSrv.setup({ typename: 'Product', destUrl: 'products', view: 'card' });
		this.items$ = this.listHelper.filteredItems$;
	}

}
