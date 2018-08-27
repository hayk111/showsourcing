import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProjectWorkflowFeatureService } from '~features/project/services';
import { ERM, Product, ProductVote, Project } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { NotificationService, NotificationType } from '~shared/notifications';


@Component({
	selector: 'add-products-dialog-app',
	templateUrl: './add-products-dialog.component.html',
	styleUrls: ['./add-products-dialog.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService
	]
})
export class AddProductsDialogComponent extends ListPageComponent<Product, ProjectWorkflowFeatureService> implements OnInit {

	@Input() selectedProjects: Project[];
	searchFilterElements$: Observable<any[]>;
	selected: number;

	constructor(
		protected router: Router,
		protected featureSrv: ProjectWorkflowFeatureService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected cdr: ChangeDetectorRef,
		protected moduleRef: NgModuleRef<any>,
		private notifSrv: NotificationService) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT);
	}

	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

	hasSelectedProducts() {
		return (Array.from(this.selectionSrv.selection.values()).length > 0);
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	submit() {
		// we add each project one by one to the store
    const selectedProducts = this.getSelectedProducts();
    console.log('>> this.selectedProjects = ', this.selectedProjects);
		this.featureSrv.addProductsToProjects(selectedProducts, this.selectedProjects)
			.subscribe(projects => {
				this.dlgSrv.close();
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: 'Products Added',
					message: 'Your products were added to the project with success',
					timeout: 3500
				});
			});
	}
}
