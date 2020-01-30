import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierDescriptor } from '~core/descriptors';
import { CommentService, SupplierService } from '~core/ORM/services';
import { Comment, ERM, Product, Sample, Supplier, Task } from '~models';
import { Contact } from '~models/contact.model';
import { CloseEvent, CloseEventType } from '~shared/dialog';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'activity-page-app',
	templateUrl: './activity-page.component.html',
	styleUrls: ['./activity-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityPageComponent extends AutoUnsub implements OnInit {

	supplier: Supplier;
	supplier$: Observable<Supplier>;
	products$: Observable<Product[]>;
	contacts$: Observable<Contact[]>;
	erm = ERM;
	supplierDescriptor: SupplierDescriptor;
	config = new DynamicFormConfig({ mode: 'editable-text' });

	// sample & task used for the preview
	sample: Sample;
	task: Task;
	previewOpened = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private commentSrv: CommentService,
		private supplierSrv: SupplierService,
		public dlgCommonSrv: DialogCommonService
	) {
		super();
	}

	ngOnInit() {

		// getting the id of the supplier
		const id$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id),
		);

		// getting supplier
		this.supplier$ = id$.pipe(
			switchMap(id => this.supplierSrv.selectOne(id)),
			tap(supplier => this.supplier = supplier)
		);

		// getting its products
		this.products$ = id$.pipe(
			switchMap(id => this.supplierSrv.getProducts(id))
		);

		this.contacts$ = id$.pipe(
			switchMap(id => this.supplierSrv.getContacts(id))
		);

		this.supplierDescriptor = new SupplierDescriptor([
			'country', 'generalMOQ', 'generalLeadTime', 'incoTerm', 'harbour', 'officeEmail', 'officePhone',
			'website', 'supplierType', 'address'
		]);
		this.supplierDescriptor.modify([
			{ name: 'generalMOQ', label: 'general-moq' },
			{ name: 'harbour', label: 'port-loading' },
			{ name: 'website', label: 'web' },
		]);

	}

	/** updates supplier */
	update(supplier: Supplier) {
		this.supplierSrv.update({ id: this.supplier.id, ...supplier })
			.subscribe();
	}

	sendComment(text: string) {
		const comment = new Comment({ text });
		const commentUser = { ...comment };
		const comments = [...(this.supplier.comments || [])];
		comments.push(commentUser);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.supplierSrv.update({ id: this.supplier.id, comments }))
		).subscribe();
	}

	goToSamples() {
		this.router.navigate(['suppliers', this.supplier.id, 'samples']);
	}

	goToTasks() {
		this.router.navigate(['suppliers', this.supplier.id, 'tasks']);
	}

	goToProducts() {
		this.router.navigate(['suppliers', this.supplier.id, 'products']);
	}

	openSelectProductDlg(supplier) {
		this.dlgCommonSrv.openSelectProductDlg().pipe(
			filter((event: CloseEvent) => event.type === CloseEventType.OK)
		).subscribe();
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

}
