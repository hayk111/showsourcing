import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { TemplateService } from '~core/template/services/template.service';
import { WorkspaceFeatureService } from '~features/workspace/services/workspace-feature.service';
import { ERM, Product, ProductVote } from '~models';
import { NotificationService } from '~shared/notifications';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { AutoUnsub } from '~utils/auto-unsub.component';


@Component({
	selector: 'workspace-review-page-app',
	templateUrl: './review-page.component.html',
	styleUrls: ['./review-page.component.scss'],
	providers: [
		ListPageService
	]
})

export class ReviewPageComponent extends AutoUnsub implements OnInit {

	products$ = new Subject<Product[]>();
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	currentSort = { sortBy: 'supplier.name', descending: true };
	currentSearch = null;

	constructor(
		public router: Router,
		public cdr: ChangeDetectorRef,
		public notificationSrv: NotificationService,
		public templateSrv: TemplateService,
		public thumbSrv: ThumbService,
		public featureSrv: WorkspaceFeatureService,
		public commonDlgSrv: CommonDialogService,
		public listSrv: ListPageService<Product, WorkspaceFeatureService>
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.REVIEWPAGE,
			entitySrv: this.featureSrv,
			searchedFields: ['supplier.name'],
			initialSortBy: 'supplier.name',
			initialPredicate: `deleted == false && archived == false && status == null`,
			entityMetadata: ERM.PRODUCT
		});
		this.listSrv.unselectAll();

		this.selected$ = this.listSrv.selection$;

		this.templateSrv.bottomReached$.pipe(
			takeUntil(this._destroy$)
		).subscribe(_ => {
			this.listSrv.loadMore();
		});

	}

	/** Returns the selected products */
	getSelectedProducts() {
		return Array.from(this.listSrv.selectionSrv.selection.values());
	}

	/** Update the sort from the menu */
	sortFromMenu(fieldName) {
		if (this.currentSort && this.currentSort.sortBy === fieldName) {
			this.currentSort = { ...this.currentSort, descending: !this.currentSort.descending };
		} else {
			this.currentSort = { ...this.currentSort, sortBy: fieldName };
		}
		this.listSrv.sort(this.currentSort);
	}

	/** Add a product to workflow */
	onSentToWorkflow(product: Product) {
		this.featureSrv.sendProductToWorkflow(product).subscribe();
		this.listSrv.unselectOne(product, true);
	}

	/** Triggers archive product */
	onArchive(product: Product) {
		const { id } = product;
		this.featureSrv.update({ id, archived: true }).subscribe();
	}

	/** Triggers status update */
	onStatusUpdated({ product, status }) {
		this.featureSrv.updateProductStatus(product, status).subscribe();
	}

	/** updates the products with the new value votes */
	multipleVotes(votes: Map<string, ProductVote[]>) {
		votes.forEach((v, k) => this.listSrv.update({ id: k, votes: v }));
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

}
