import { ChangeDetectionStrategy, Component, OnInit, NgModuleRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, takeUntil, switchMap, tap, catchError, take, first } from 'rxjs/operators';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductService, ProjectService } from '~global-services';
import { ERM, Product, Project } from '~models';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { AddProductsDialogComponent } from '~features/project/containers/add-products-dialog/add-products-dialog.component';

@Component({
	selector: 'project-products-app',
	templateUrl: './project-products.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		SelectionService,
	]
})
export class ProjectProductsComponent extends ListPageComponent<Product, ProductService> implements OnInit {

	project$: Observable<Project>;
	private projectId: string;

	constructor(
		protected router: Router,
		protected srv: ProductService,
		protected projectSrv: ProjectService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected route: ActivatedRoute,
		protected moduleRef: NgModuleRef<any>) {
		super(router, srv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.PRODUCT, AddProductsDialogComponent);
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			tap(id => this.projectId = id)
		);
		id$.pipe(
			takeUntil(this._destroy$),
			switchMap(id => this.projectSrv.selectOne(id))
		).subscribe(project => {
			console.log('>> project$ = ', project);
			this.setAdditionalDialogParams({ selectedProjects: project ? [project] : null });
		});
		this.project$ = id$.pipe(switchMap(id => this.projectSrv.queryOne(id)));
		// we need to wait to have the id to call super.ngOnInit, because we want the filter
		// method to be called when we actually have the id
		id$.pipe(
			first()
		).subscribe(_ => super.ngOnInit());
	}

	/** Filters items based  */
	protected filter(query: string) {
		// if (query)
		// 	super.filter(`projects.id == "${this.projectId}" AND (${query})`);
		// else
		// 	super.filter(`projects.id == "${this.projectId}"`);
	}

}
