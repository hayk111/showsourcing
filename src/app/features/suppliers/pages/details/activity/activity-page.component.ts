import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { descriptorMock } from '~common/dialogs/creation-dialogs/product-creation-dialog/_temporary-descriptor-product.mock';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { AutoUnsub } from '~utils';
import { api, Sample, Supplier, Task, Comment, Contact, Product, SupplierTag } from 'showsourcing-api-lib';

@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	private supplierId: string;
	private nodeId: string;

	@Input() supplier: Supplier;
	@Input() supplierTags: SupplierTag[];

	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	contacts$: Observable<Contact[]>;
	descriptor = descriptorMock;
	comments$: Observable<any>;
	commentListRef: any;
	// sample & task used for the preview
	previewOpened = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public dlgCommonSrv: DialogCommonService,
	) {
		super();
	}

	ngOnInit() {

		// getting the id of the supplier
		const id$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
			tap(id => this.supplierId = id)
		);

		this.comments$ = id$.pipe(
			map(id => this.nodeId = `Supplier:${id}`),
			map(nodeId => api['Comment'].findByNodeId$(nodeId).data$),
			tap(query => this.commentListRef = query),
			switchMap(query => query)
		);

	}

	/** updates supplier */
	update(supplier: Supplier) {
		api.Supplier.update([{ id: this.supplier.id, ...supplier } as any]);
	}

	sendComment(message: string) {
		const comment: Comment = {
			message,
			nodeId: this.nodeId
		};
		api['Comment'].create([comment]).local$.subscribe();
	}

	onCommentDeleted(comment: Comment) {
		api.Comment.delete([comment]);
	}

	goToSamples() {
		this.router.navigate(['suppliers', this.supplierId, 'samples']);
	}

	goToTasks() {
		this.router.navigate(['suppliers', this.supplierId, 'tasks']);
	}

	goToProducts() {
		this.router.navigate(['suppliers', this.supplierId, 'products']);
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
		// this.task = task;
		// this.sample = null;
		this.openPreview();
	}
	/**
	 * open sample preview and sets task to null
	 * @param sample
	 */
	openSamplePreview(sample: Sample) {
		// this.sample = sample;
		// this.task = null;
		this.openPreview();
	}

	/** close preview and sets task & sample to null */
	closePreview() {
		// this.task = null;
		// this.sample = null;
		this.previewOpened = false;
	}

	addProducts() {
		this.dlgCommonSrv.openSelectionDlg('Product');
		// TODO add products to this.supplier
	}

}
