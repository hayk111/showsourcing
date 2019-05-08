import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDialogService } from '~common/modals/services/product-dialog.service';
import { Product, Project } from '~models';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';
import { TrackingComponent } from '~utils/tracking-component';
import { CloseEventType } from '~shared/dialog';
import { translate } from '~utils';



@Component({
	selector: 'product-add-to-project-dlapp',
	templateUrl: './product-add-to-project-dlg.component.html',
	styleUrls: ['./product-add-to-project-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddToProjectDlgComponent extends TrackingComponent implements OnInit {

	projects$: Observable<Project[]>;
	@Input() products: Product[];
	selected = {};
	numSelected = 0;


	constructor(
		private dlgSrv: DialogService,
		private productDlgSrv: ProductDialogService,
		private notifSrv: NotificationService) {
		super();
	}

	ngOnInit() {
		this.projects$ = this.productDlgSrv.selectProjects();
	}

	select(id, value) {
		this.selected[id] = value;
		++this.numSelected;
	}

	unselect(id) {
		delete this.selected[id];
		--this.numSelected;
	}

	submit() {
		// we add each project one by one to the store
		const selectedProjects = <Project[]>Object.values(this.selected);
		this.dlgSrv.close({ type: CloseEventType.OK, data: { selectedProjects, products: this.products } });

		this.productDlgSrv.addProjectsToProducts(selectedProjects, this.products)
			.subscribe(projects => {
				this.dlgSrv.close();
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: translate('Projects added'),
					message: translate('Your projects were added to the product with success'),
					timeout: 3500
				});
			});
	}

}
