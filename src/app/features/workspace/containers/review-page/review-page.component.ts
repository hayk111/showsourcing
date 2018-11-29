import { ChangeDetectorRef, Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ERM, Product, ProductVote, ERM_TOKEN } from '~models';
import {
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { SelectionService } from '~core/list-page/selection.service';
import { NotificationService } from '~shared/notifications';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TemplateService } from '~core/template/services/template.service';
import { ID } from '~utils/id.utils';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { ListPageProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { AutoUnsub } from '~utils/auto-unsub.component';


@Component({
	selector: 'workspace-review-page-app',
	templateUrl: './review-page.component.html',
	styleUrls: ['./review-page.component.scss'],
	providers: [
		ListPageProviders.getProviders(ProviderKey.REVIEWPAGE, ERM.REVIEW),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.REVIEW }]
})
export class ReviewPageComponent extends AutoUnsub implements OnInit {

	products$ = new Subject<Product[]>();
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	currentSort = { sortBy: 'supplier.name', descending: true };
	currentSearch = null;

	constructor(
		protected router: Router,
		protected cdr: ChangeDetectorRef,
		protected workspaceSrv: WorkspaceFeatureService,
		protected notificationSrv: NotificationService,
		private templateSrv: TemplateService,
		protected thumbSrv: ThumbService,
		protected featureSrv: WorkspaceFeatureService,
		protected viewSrv: ListPageViewService<Product>,
		public dataSrv: ListPageDataService<Product, WorkspaceFeatureService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
		) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['supplier.name'],
			initialSortBy: 'supplier.name',
			initialPredicate: `deleted == false && archived == false && status == null`
		});
		this.dataSrv.init();

		this.selectionSrv.unselectAll();

		this.selected$ = this.selectionSrv.selection$;

		this.templateSrv.bottomReached$.pipe(
			takeUntil(this._destroy$)
		).subscribe(_ => {
			this.dataSrv.loadMore();
		});

	}

	protected setItems() {
		this.dataSrv.listResult = this.featureSrv.getListQuery({
			query: this.dataSrv.initialPredicate,
			sortBy: this.dataSrv.initialSortBy,
			descending: false
		});

		this.dataSrv.items$ = this.dataSrv.listResult.items$.pipe(
			tap(_ => this.dataSrv.onLoaded()),
			tap(items => this.dataSrv.items = items),
			map(items => items.filter(item => !item.deleted && !item.archived && !item.status))
		);
	}

	/** Returns the selected products */
	getSelectedProducts() {
		return Array.from(this.selectionSrv.selection.values());
	}

	/** Update the sort from the menu */
	sortFromMenu(fieldName) {
		if (this.currentSort && this.currentSort.sortBy === fieldName) {
			this.currentSort = { ...this.currentSort, descending: !this.currentSort.descending };
		} else {
			this.currentSort = { ...this.currentSort, sortBy: fieldName };
		}
		this.dataSrv.sort(this.currentSort);
	}

	/** Add a product to workflow */
	onSentToWorkflow(product: Product) {
		this.workspaceSrv.sendProductToWorkflow(product).subscribe();
		this.selectionSrv.unselectOne(product, true);
	}

	/** Triggers archive product */
	onArchive(product: Product) {
		const { id } = product;
		this.workspaceSrv.update({ id, archived: true }).subscribe();
	}

	/** Triggers status update */
	onStatusUpdated({ product, status }) {
		this.workspaceSrv.updateProductStatus(product, status).subscribe();
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.dataSrv.update({ id: k, votes: v }));
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog() {
		this.commonDlgSrv.openAddToProjectDialog(this.getSelectedProducts());
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog() {
		this.commonDlgSrv.openExportDialog(this.getSelectedProducts());
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog() {
		this.commonDlgSrv.openRequestFeedbackDialog(this.getSelectedProducts());
	}

	deleteUnselectOne(product: Product) {
		this.dataSrv.deleteOne(product.id);
		this.selectionSrv.unselectOne(product);
	}

}
