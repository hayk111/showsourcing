import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product } from '~core/erm3/models';
import { FilterService, FilterType } from '~core/filters';
import { ListHelper2Service, ListPageViewService, SelectionService } from '~core/list-page2';
import { RatingService } from '~shared/rating/services/rating.service';


@Component({
	selector: 'card-page-app',
	templateUrl: './card-page.component.html',
	styleUrls: ['./card-page.component.scss'],
	providers: [
		ListHelper2Service,
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
		public listHelper: ListHelper2Service<Product>,
		public viewSrv: ListPageViewService<Product>,
		public selectionSrv: SelectionService,
		public dlgCommonSrv: DialogCommonService,
		public ratingSrv: RatingService,
	) {}

	ngOnInit() {
		this.listHelper.setup('Product');
		this.viewSrv.setup({ typename: 'Product', destUrl: 'products', view: 'card' });
	}

	addToProject(event) {
		this.dlgCommonSrv.openSelectionDlg('Project', [event]);
		// TODO add the logic after closing dialog
	}

}
