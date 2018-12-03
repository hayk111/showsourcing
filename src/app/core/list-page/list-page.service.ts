import { Injectable } from '@angular/core';
import { SelectionWithFavoriteService } from './selection-with-favorite.service';
import { ListPageDataService } from './list-page-data.service';
import { ListPageViewService } from './list-page-view.service';
import { DialogService } from '~shared/dialog';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ListPageService {
	selectionSrv;
	dataSrv;
	viewSrv;

	constructor(
		private dlgSrv: DialogService,
		private thumbSrv: ThumbService,
		private router: Router
	) { }

	setup() {
		this.selectionSrv = new SelectionWithFavoriteService();
		this.dataSrv = new ListPageDataService(
			this.dlgSrv,
			this.thumbSrv,
			this.selectionSrv
		);
		this.viewSrv = new ListPageViewService(this.router, erm);
	}
}
