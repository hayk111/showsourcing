import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ListPageKey, ListPageService } from '~core/list-page';
import { NEW_STATUS_ID } from '~core/models/status.model';
import { ProductService, ProductStatusService, ProjectService } from '~entity-services';
import { ProjectFeatureService } from '~features/project/services';
import { ERM, Product, ProductStatus, Project } from '~models';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { translate } from '~utils';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'project-workflow-app',
	templateUrl: './project-workflow.component.html',
	styleUrls: ['./project-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		KanbanService
	]
})
export class ProjectWorkflowComponent extends AutoUnsub implements OnInit {
	project$: Observable<Project>;
	columns$ = this.kanbanSrv.columns$;
	project: Project;
	private statuses: ProductStatus[];
	erm = ERM;
	amountLoaded = 15;

	constructor(
		private route: ActivatedRoute,
		private projectSrv: ProjectService,
		private productSrv: ProductService,
		private productStatusSrv: ProductStatusService,
		private featureSrv: ProjectFeatureService,
		public listSrv: ListPageService<Product, ProjectFeatureService>,
		public commonModalSrv: CommonModalService,
		private kanbanSrv: KanbanService,
		private dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);

		this.listSrv.setup({
			key: ListPageKey.PROJECT_WORKFLOW,
			entitySrv: this.productSrv,
			entityMetadata: ERM.PRODUCT,
			selectParams: { query: 'deleted == false' }
		}, false);

		this.project$.pipe(
			takeUntil(this._destroy$)
		).subscribe(project => this.project = project);

		this.productStatusSrv
			.queryAll(undefined, {
				query: 'category != "refused"',
				sortBy: 'step',
				descending: false,
			}).pipe(
				first(),
				// adding new status
				map(statuses => [{ id: NEW_STATUS_ID, name: 'New Product', category: 'new' }, ...statuses]),
				tap(statuses => this.kanbanSrv.setColumnsFromStatus(statuses)),
				tap(statuses => this.statuses = statuses),
				takeUntil(this._destroy$)
			).subscribe(statuses => this.getProducts(statuses));

	}

	loadMore(col: KanbanColumn) {
		const query = col.id !== NEW_STATUS_ID ?
			`status.id == "${col.id}" && projects.id == "${this.project.id}" && deleted == false && archived == false`
			: `status == null && projects.id == "${this.project.id}" && deleted == false && archived == false`;
		this.productSrv.queryMany({
			query,
			take: col.data.length + this.amountLoaded,
			sortBy: 'lastUpdatedDate'
		}).pipe(
			first()
		).subscribe(products => this.kanbanSrv.setData(products, col.id));
	}

	private getProducts(statuses: ProductStatus[]) {
		statuses.forEach(status => {
			let query;
			// we need to check for null status
			if (status.id !== NEW_STATUS_ID)
				query = `status.id == "${status.id}" && projects.id == "${this.project.id}" && deleted == false && archived == false`;
			else
				query = `status == null && projects.id == "${this.project.id}" && deleted == false && archived == false`;

			this.productSrv.queryMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' })
				.pipe(first())
				.subscribe(prods => this.kanbanSrv.setData(prods, status.id));
			this.productSrv.queryCount(query).pipe(first())
				.subscribe(total => this.kanbanSrv.setTotal(total, status.id));
		});
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		this.featureSrv.openFindProductDlg(this.project).pipe(
			tap(data => this.getProducts(this.statuses))
		).subscribe();
	}


	onUpdate(product: Product) {
		this.kanbanSrv.updateData(product);
	}

	previewStatusUpdate(product: Product) {
		this.kanbanSrv.onExternalStatusChange([product]);
	}

	updateProductStatus(event: KanbanDropEvent) {
		// if dropped in the same column do nothing
		if (event.to === event.from) {
			return;
		}
		// we update on the server
		const isNewStatus = event.to.id === NEW_STATUS_ID;
		this.productSrv.update(
			{
				id: event.item.id,
				status: isNewStatus ? null : new ProductStatus({ id: event.to.id })
			},
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	/** multiple */
	updateProductsStatus(event: KanbanDropEvent) {
		const isNewStatus = event.to.id === NEW_STATUS_ID;
		const products = event.items.map(id => ({
			id,
			status: isNewStatus ? null : new ProductStatus({ id: event.to.id })
		}));
		this.productSrv.updateMany(
			products,
			Client.TEAM,
			isNewStatus ? 'status { id }' : ''
		).subscribe();
	}

	onColumnSelected(products: Product[]) {
		products.forEach(prod => this.listSrv.selectOne(prod, true));
	}

	onColumnUnselected(products: Product[]) {
		products.forEach(prod => this.listSrv.unselectOne(prod, true));
	}

	onFavoriteAllSelected() {
		this.listSrv.onFavoriteAllSelected();
		const updated = this.listSrv.getSelectedIds()
			.map(id => ({ id, favorite: true }));
		this.kanbanSrv.updateMany(updated);
	}

	onUnfavoriteAllSelected() {
		this.listSrv.onUnfavoriteAllSelected();
		const updated = this.listSrv.getSelectedIds()
			.map(id => ({ id, favorite: false }));
		this.kanbanSrv.updateMany(updated);
	}

	onMultipleThumbUp(isCreated) {
		const updated = this.listSrv.onMultipleThumbUp(isCreated);
		this.kanbanSrv.updateMany(updated);
	}

	onMultipleThumbDown(isCreated) {
		const updated = this.listSrv.onMultipleThumbDown(isCreated);
		this.kanbanSrv.updateMany(updated);
	}

	deleteSelected() {
		const itemIds = this.listSrv.getSelectedIds();
		const del = translate('delete');
		const text = `${del} ${itemIds.length} `
			+ (itemIds.length <= 1 ? this.listSrv.entityMetadata.singular : this.listSrv.entityMetadata.plural);

		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			switchMap(_ => this.listSrv.dataSrv.deleteMany(itemIds)),
		).subscribe(_ => {
			this.listSrv.selectionSrv.unselectAll();
			this.kanbanSrv.deleteItems(itemIds);
		});
	}

	onMultipleStatusChange(status: ProductStatus) {
		const updated = this.listSrv.getSelectedIds()
			.map(id => ({ id, status }));
		this.kanbanSrv.onExternalStatusChange(updated);
		this.productSrv.updateMany(updated).subscribe();
	}
}
