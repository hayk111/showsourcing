import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ListPageService } from '~core/list-page';
import { NEW_STATUS_ID } from '~core/models/status.model';
import { ProductService, ProductStatusService, ProjectService } from '~entity-services';
import { ProjectFeatureService } from '~features/projects/services';
import { ERM, Product, ProductStatus, Project } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { KanbanDropEvent } from '~shared/kanban/interfaces';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'workflow-page-app',
	templateUrl: './workflow-page.component.html',
	styleUrls: ['./workflow-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService,
		KanbanService
	]
})
export class WorkflowPageComponent extends AutoUnsub implements OnInit {
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
		public dialogCommonSrv: DialogCommonService,
		private kanbanSrv: KanbanService,
		private dlgSrv: DialogService,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		const id = this.route.parent.snapshot.params.id;
		this.project$ = this.projectSrv.queryOne(id);

		this.listSrv.setup({
			entitySrv: this.productSrv,
			entityMetadata: ERM.PRODUCT,
			selectParams: { query: 'deleted == false AND archived == false' }
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
		const query = this.getColQuery(col.id);
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
			const query = this.getColQuery(status.id);
			this.productSrv.selectMany({ query, take: this.amountLoaded, sortBy: 'lastUpdatedDate' })
				.pipe(take(1))
				.subscribe(prods => this.kanbanSrv.setData(prods, status.id));
			this.productSrv.selectCount(query)
				.pipe(take(1))
				.subscribe(total => this.kanbanSrv.setTotal(total, status.id));
		});
	}

	// returns the query of the columns based on the parameters on the list srv and a constant query
	private getColQuery(colId: string) {
		const predicate = this.listSrv.filterList.asPredicate();
		const constQuery = colId !== NEW_STATUS_ID ?
			`status.id == "${colId}" AND projects.id == "${this.project.id}"` :
			`status == null AND projects.id == "${this.project.id}"`;
		return [
			predicate,
			constQuery
		].filter(x => x !== '')
			.join(' && ');
	}

	/** Open the find products dialog and passing selected products to it */
	openFindProductDlg() {
		this.featureSrv.openFindProductDlg(this.project).pipe(
			first(),
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

	deassociateProducts() {
		const unselectedProducts = this.listSrv.getSelectedIds().map(id => ({ id }));
		this.featureSrv.manageProjectsToProductsAssociations([this.project], { unselectedProducts }).pipe(
			tap(_ => this.getProducts(this.statuses))
		).subscribe();
		this.listSrv.unselectAll();
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
		const del = this.translate.instant('button.delete');
		const text = `${del} ${itemIds.length} `
			+ (itemIds.length <= 1 ? this.listSrv.entityMetadata.singular : this.listSrv.entityMetadata.plural);

		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
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
