import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api, Product, Sample, Project, Task, Supplier, ProjectProduct, Vote, Image } from 'showsourcing-api-lib';
import { Observable, Subject, BehaviorSubject, interval } from 'rxjs';
import { TeamService } from '~core/auth';
import { map, switchMap, takeUntil, tap, first, shareReplay, throttleTime } from 'rxjs/operators';
import { SupplierRequestDialogComponent } from '~common/dialogs/custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { DialogService, CloseEvent, CloseEventType } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { RatingService } from '~shared/rating/services/rating.service';
import { AutoUnsub, log, weightUnits } from '~utils';
import { ListHelper2Service } from '~core/list-page2';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

/**
 *
 * My old aunts would come and tease me at weddings, “Well Sarah? Do you think you’ll be next?”
 *  -
 * We’ve settled this quickly once I’ve started doing the same to them at funerals.
 *
 */

@Component({
	selector: 'details-page-app',
	templateUrl: './details-page.component.html',
	styleUrls: ['./details-page.component.scss'],
	host: { class: 'details-page' }
})
export class DetailsPageComponent extends AutoUnsub implements OnInit {
	@Input() product: Product;
	@Input() requestCount: number;
	@Input() previewMode = false;

	// this is used only on preview mode
	@Output() back = new EventEmitter();

	@ViewChild('main', { read: ElementRef, static: false }) main: ElementRef;
	@ViewChild('rating', { read: ElementRef, static: false }) rating: ElementRef;

	productId: string;
	product$: Observable<Product>;
	productProjects: (ProjectProduct | string)[];
	projects: Project[] | undefined;

	_productRemoved = false;

	teamVotes$: Observable<Vote[]>;
	productMainSectionFragment = 'info';

	// sample & task used for the preview
	sample: Sample;
	task: Task;
	previewOpened = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dlgSrv: DialogService,
		private toastSrv: ToastService,
		private ratingSrv: RatingService,
		private translate: TranslateService,
		public listHelper: ListHelper2Service,
		public dlgCommonSrv: DialogCommonService,
	) {
		super();
	}

	ngOnInit() {
		if (!!this.product) { // for the previews
			this.onProduct(this.product);

			api.Product
				 .get$(this.product.id)
				 .data$
				 .pipe(
					 takeUntil(this._destroy$),
					 tap(product => this.productId = product?.id),
					 map((product: any) => this.assignImagesToProduct(product)),
				 )
				 .subscribe(
					product => this.onProduct(product),
					err => this.onError(err)
				);
		} else {
			this.route.params.pipe(
				map(params => params.id),
				tap(id => this.productId = id),
				switchMap(() => api.Product.get$(this.productId).data$),
				map((product: any) => {
					if (product) {
						return this.assignImagesToProduct(product);
					}
				}),
				takeUntil(this._destroy$),
			).subscribe(
				product => this.onProduct(product),
				err => this.onError(err)
			);
		}

		api.ProjectProduct.find$({
			filter: {
				property: 'id',
				contains: this.product?.id
			}
		}).data$
			.pipe(
				map((productProjects: ProjectProduct[]) => {
					this.productProjects = productProjects;
					return productProjects.map((projectProduct: ProjectProduct) => projectProduct.project);
				}),
				tap((projects: Project[]) => this.projects = projects),
				takeUntil(this._destroy$),
			).subscribe();
	}

	private onProduct(product) {
		if (!product && !this._productRemoved) {
			this.toastSrv.add({
				type: ToastType.ERROR,
				title: 'title.product-not-exist',
				timeout: 3500
			});
			this.router.navigate(['products']);
		} else {
			this.product = product;
			// this.teamVotes$ = this.ratingSrv.getTeamVotes('Product:' + this.product.id) as any;
		}
	}

	private onError(error) {
		log.error(error);
		this.toastSrv.add({
			type: ToastType.ERROR,
			title: 'title.error',
			message: 'message.there-is-an-error',
			timeout: 3500
		});
		this.router.navigate(['products']);
	}

	private assignImagesToProduct(product: any) {
		const updatedProduct = {...product};
		updatedProduct.images = this.getProductImgs(product.id);
		return updatedProduct;
	}

	private getProductImgs(productId: string): Image[] {
		return api.Image.findLocal({
			filter: {
				property: 'nodeId',
				isString: 'Product:' + productId
			}
		});
	}

	goBack() { // back to list page
		if (this.previewMode) {
			this.back.emit();
			return;
		}
		const secondSlashIndex = this.router.url.slice(1).indexOf('/');
		const pathToBack = this.router.url.slice(1, secondSlashIndex + 1);
		this.router.navigate([pathToBack]);
	}

	onArchive(product: Product | Product[]) {
		// TODO: implement on archive
	}

	onExport() {
		this.dlgCommonSrv.openExportDlg('Product', [this.product]);
	}

	/** item has been favorited */
	onFavorited() {
		api.Product
			.update([{ id: this.product.id, favorite: true } as any]);
	}

	/** item has been unfavorited */
	onUnfavorited() {
		api.Product
			.update([{ id: this.product.id, favorite: false } as any]);
	}

	onThumbUp() {
		// const votes = this.ratingSrv.thumbUp(this.product, EntityName.PRODUCT);
		// this.updateProduct({ votes });
	}

	onThumbDown() {
		// const votes = this.ratingSrv.thumbDown(this.product, EntityName.PRODUCT);
		// this.updateProduct({ votes });
	}

	/** update the product */
	updateProduct(propValue: any) {
		api.Product.update([{ id: this.product.id, ...propValue } as any]).local$
			.pipe(takeUntil(this._destroy$))
			.subscribe();
	}

	updateProductProjects(projects: Project[]) {
		if (projects.length < this.productProjects.length) {
			const projectIds = _.difference(
				this.productProjects.map((p: ProjectProduct) => (p.project as Project).id),
				projects.map(p => p.id)
			);
			const idsToDelete = this.productProjects
				.filter(
					(productProject: ProjectProduct) => projectIds.includes((productProject.project as Project).id)
				).map((productProject: ProjectProduct) => ({ id: productProject.id}));

			api.ProjectProduct.delete(idsToDelete);
			return;
		}
		const toPass = [];

		projects.forEach(project => {
			const { id } = project;
 			toPass.push({
				project: id,
				product: this.productId
			});
		});
		api.ProjectProduct.create(toPass);
	}

	deleteProduct(id: string) {
		this.dlgSrv
			.open(ConfirmDialogComponent, {
				text: 'message.confirm-delete-product'
			})
			.data$.pipe(
				tap((confirmed: boolean) => this._productRemoved = !!confirmed),
				switchMap(() => {
					return api.Product.delete([{id}]).local$;
				}),
				tap(_ => {
					this.toastSrv.add({
						type: ToastType.SUCCESS,
						title: 'title.success',
						message: 'message.product-deleted',
						timeout: 3500
					});
				}),
				takeUntil(this._destroy$),
			).subscribe(_ => this.router.navigate(['products', 'table']));
	}

	openSupplierRequest(product: Product) {
		this.dlgSrv.open(SupplierRequestDialogComponent, { products: [product] });
	}

	hasBadge(type: string) {
		if (!this.product)
			return;

		// switch (type) {
		// 	case 'tasks': return this.product.tasksLinkedAssignedToMe.count > 0;
		// 	case 'samples': return this.product.samplesLinkedAssignedToMe.count > 0;
		// 	case 'requests': return this.requestCount > 0;
		// }
	}

	/** navigate to project details */
	openProjectDetails(project: Project) {
		this.router.navigate(['projects', project.id || '']);
	}

	/** open preview */
	openPreview() {
		this.previewOpened = true;
	}

	/**
	 * open task preview and sets sample to null
	 * @param task
	 */
	openTaskPreview(task: Task) {
		this.task = task;
		this.sample = null;
		this.openPreview();
	}
	/**
	 * open sample preview and sets task to null
	 * @param sample
	 */
	openSamplePreview(sample: Sample) {
		this.sample = sample;
		this.task = null;
		this.openPreview();
	}

	/** close preview and sets task & sample to null */
	closePreview() {
		this.task = null;
		this.sample = null;
		this.previewOpened = false;
	}

	/** redirects to a page inside products and scroll into that view */
	goToTable(page: string) {
		this.main.nativeElement.scrollIntoView({ behavior: 'smooth' });
		this.productMainSectionFragment = page;
	}

	goToSupplier(supplier: Supplier) {
		this.router.navigate(['suppliers', supplier.id]);
	}

	scrollToRating() {
		this.rating.nativeElement.scrollIntoView({ behavior: 'smooth' });
	}

	dissociateProject(projectToDelete: Project) {
		const idToDelete = this.productProjects
			.filter(
				(productProject: ProjectProduct) => projectToDelete.id === (productProject.project as Project).id
			)
			.map((productProject: ProjectProduct) => ({ id: productProject.id}));

		api.ProjectProduct.delete(idToDelete);
	}

}
