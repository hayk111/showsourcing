import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef,
	EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { api, models} from 'showsourcing-api-lib';
import { Observable, Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { SampleCatalogComponent } from '~common/catalogs/sample-catalog/sample-catalog.component';
import { TaskCatalogComponent } from '~common/catalogs/task-catalog/task-catalog.component';
import { descriptorMock } from '~common/dialogs/creation-dialogs/product-creation-dialog/_temporary-descriptor-product.mock';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AppImage, Comment, CommentService, Sample, Task } from '~core/erm';
import { Product, Vote } from '~core/erm3/models';
import { ListHelper2Service } from '~core/list-page2';
import { UploaderService } from '~shared/file/services/uploader.service';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { RatingDashboardComponent } from '~shared/rating';
import { RatingService } from '~shared/rating/services/rating.service';
import { AutoUnsub, PendingImage } from '~utils';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit {
	/** This is the product passed as input, but it's not yet fully loaded */
	@Input()
	set product(value: any) {
		this._productSubscription$?.unsubscribe();
		this._productSubscription$ = api.Product.get(value?.id).subscribe(product => {
			this._product = product;
			this.cd.markForCheck();
		});
	}
	get product() {
		return this._product;
	}

	private _images: AppImage[] = [];
	@Input()
	set images(images: AppImage[]) {
		this._images = images;
	}
	get images() {
		return [...this._images, ...(this._pendingImages as any)];
	}

	@Input() isPreview = true;

	@Output() close = new EventEmitter<any>();
	@Output() updated = new EventEmitter<Product>();
	@Output() statusUpdated = new EventEmitter<Product>();
	@Output() clickOutside = new EventEmitter<null>();

	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;
	@ViewChild(SampleCatalogComponent, { read: ElementRef, static: false }) sampleCatalog: ElementRef;
	@ViewChild(TaskCatalogComponent, { read: ElementRef, static: false }) taskCatalog: ElementRef;
	@ViewChild(RatingDashboardComponent, { read: ElementRef, static: false })
	ratingDashboard: ElementRef;
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef;

	private _product: any = {};
	private _productSubscription$: Subscription;

	teamVotes$: Observable<Vote[]>;
	userVote$: Observable<Vote>;
	descriptor = descriptorMock;
	private _pendingImages: PendingImage[] = [];

	constructor(
		private listHelper: ListHelper2Service,
		public dlgCommonSrv: DialogCommonService,
		private uploaderSrv: UploaderService,
		private cd: ChangeDetectorRef,
		private router: Router,
		private commentSrv: CommentService,
		private previewSrv: PreviewService,
		public ratingSrv: RatingService,
	) {
		super();
	}

	ngOnInit() {
		this.userVote$ = this.ratingSrv.getUserVote('product:' + this._product.id);
		this.teamVotes$ = this.ratingSrv.getTeamVotes('product:' + this._product.id);
	}

	updateVote(vote$: Observable<Vote>) {
		this.userVote$ = vote$;
	}

	// UPDATE FUNCTIONS
	updateProduct(productConfig: any) {
		const product = { ...productConfig, id: this._product.id };
		this.listHelper.update(product, 'Product');
		this._product = product;
		this.updated.emit(product);
	}

	update(value: any, prop: string) {
		this.updateProduct({ [prop]: value });
	}

	updateTask(task: Task) {
		// this.taskSrv.update(task).subscribe();
	}

	updateSample(sample: Sample) {
		// this.sampleSrv.update(sample).subscribe();
	}

	addComment(comment: Comment) {
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		// const commentUser = { ...comment, createdBy: { id: this.userSrv.userSync.id } };
		const commentUser = { ...comment };
		const comments = [...(this._product.comments || [])];
		comments.push(commentUser);
		this.commentSrv
			.create(comment)
			.pipe(tap((_) => this.listHelper.update({ id: this._product.id, comments })))
			.subscribe();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	async add(files: Array<File>) {
		if (files.length === 0) return;

		const uuids: string[] = await this._addPendingImg(files);
		this.cd.markForCheck();
		this.uploaderSrv
			.uploadImages(files, this.product)
			.pipe(first())
			.subscribe(
				(imgs) => {
					// removing pending image
					this._pendingImages = this._pendingImages.filter((p) => !uuids.includes(p.id));
				},
				(e) => (this._pendingImages = [])
			);
	}

	/** adds pending image to the list */
	private async _addPendingImg(files: File[]) {
		// adding a pending image so we can see there is an image pending visually
		let pendingImgs: PendingImage[] = files.map((file) => new PendingImage(file));
		pendingImgs = await Promise.all(pendingImgs.map((p) => p.createData()));
		this._pendingImages.push(...pendingImgs);
		// putting the index at the end so we instantly have feedback the image is being processed
		return pendingImgs.map((p) => p.id);
	}

	delete(product: Product) {
		const text = `Are you sure you want to delete this product ?`;
		this.dlgCommonSrv
			.openConfirmDlg({ text })
			.data$.pipe(tap((_) => api.col('Product').delete([product as any])))
			.subscribe((prod) => {
				this.close.emit();
			});
	}

	archive() {
		const text = `Are you sure you want to archive this product ?`;
		const action = 'archive';
		this.dlgCommonSrv.openConfirmDlg({ text, action }).data$.subscribe((_) => {
			this.update(true, 'archived');
			this.close.emit();
		});
	}

	// ACTIONS
	redirect(subroute?: string) {
		subroute
			? this.router.navigate(['products', this.product.id, subroute])
			: this.router.navigate(['products', this.product.id]);
	}

	openSupplier() {
		this.router.navigate(['suppliers', this.product.supplier.id]);
	}

	openAddToProject() {
		// this.dlgCommonSrv.openAddToProjectDialog([this.product]);
	}

	openCreateTask() {
		this.dlgCommonSrv
			.openCreationDlg('Task', {
				product: this.product,
				supplier: this.product && this.product.supplier,
			})
			.data$.subscribe();
		// TODO create Task
	}

	openCreateSample() {
		this.dlgCommonSrv
			.openCreationDlg('Sample', {
				product: this.product,
				supplier: this.product && this.product.supplier,
			})
			.data$.subscribe();
		// TODO create Sample
	}

	openExportModal() {
		this.dlgCommonSrv.openExportDlg('Product', [this.product]);
	}

	// TAB SELECTION
	selectFirstTab() {
		this.previewSrv.onSelectedTab(1);
	}

	selectSecondTab(scrollTo?: string) {
		this.previewSrv.onSelectedTab(2);
		switch (scrollTo) {
			case 'sample':
				this.sampleCatalog.nativeElement.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'task':
				this.sampleCatalog.nativeElement.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'rating':
				this.ratingDashboard.nativeElement.scrollIntoView({ behavior: 'smooth' });
				break;
		}
	}

	selectThirdTab() {
		this.previewSrv.onSelectedTab(3);
		this.previewComment.focus();
	}

	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}
}
