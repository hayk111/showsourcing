import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFeatureService } from '~features/products/services';
import { Project, Product } from '~models';
import { DialogService } from '~shared/dialog';
import { ProjectService, ProductService } from '~global-services';
import { ProductDialogService } from '~shared/custom-dialog/services/product-dialog.service';
import { NotificationService, NotificationType } from '~shared/notifications';



@Component({
	selector: 'product-add-to-project-dlapp',
	templateUrl: './product-add-to-project-dlg.component.html',
	styleUrls: ['./product-add-to-project-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductAddToProjectDlgComponent implements OnInit {
	projects$: Observable<Project[]>;
	selected = {};
	hasSelection = false;
	@Input() selectedProducts: Product[];


	constructor(
		private dlgSrv: DialogService,
		private productDlgSrv: ProductDialogService,
		private notifSrv: NotificationService) { }

	ngOnInit() {
		this.projects$ = this.productDlgSrv.selectProjects();
	}

	select(id, value) {
		this.selected[id] = value;
		this.hasSelection = Object.values(this.selected).length > 0;
	}

	unselect(id) {
		delete this.selected[id];
		this.hasSelection = Object.values(this.selected).length > 0;
	}

	submit() {
		// we add each project one by one to the store
		const selectedProjects = <Project[]>Object.values(this.selected);
		this.productDlgSrv.addProjectsToProducts(selectedProjects, this.selectedProducts)
			.subscribe(projects => {
				this.dlgSrv.close();
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Projects Added',
					message: 'Your projects were added to the product with success',
					timeout: 3500
				});
			});
	}

}
