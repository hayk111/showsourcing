import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ApiService, Comment, Contact, ObservableQuery, Product, Sample, Supplier, Task } from '~core/erm3';
import { AutoUnsub } from '~utils';
import { customQueries } from '~core/erm3/queries/custom-queries';

@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {
	private supplierId: string;
	private nodeId: string;
	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	contacts$: Observable<Contact[]>;
	comments$: Observable<Comment[]>;
	commentListRef: ObservableQuery;
	// sample & task used for the preview
	previewOpened = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		public dlgCommonSrv: DialogCommonService,
		private apiSrv: ApiService
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
			map(nodeId => this.apiSrv.query<Comment[]>({
				query: customQueries.comments,
				variables: { nodeId }
			})),
			tap(query => this.commentListRef = query),
			switchMap(query => query.data$)
		);

	}

	/** updates supplier */
	update(supplier: Supplier) {
		this.apiSrv.update('Supplier', { id: this.supplierId, ...supplier })
			.subscribe();
	}

	sendComment(message: string) {
		const comment: Comment = {
			message,
			nodeId: this.nodeId
		};
		this.apiSrv.create('Comment', comment)
		.subscribe(_ => this.commentListRef.refetch());
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
