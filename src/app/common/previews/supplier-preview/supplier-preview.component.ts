import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SampleCatalogComponent } from '~common/catalogs/sample-catalog/sample-catalog.component';
import { TaskCatalogComponent } from '~common/catalogs/task-catalog/task-catalog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierDescriptor } from '~core/descriptors';
import { SupplierService } from '~core/entity-services';
import { CommentService } from '~core/entity-services/comment/comment.service';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { AppImage, Comment, ERM, ExtendedFieldDefinition, Supplier } from '~core/models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { RatingDashboardComponent } from '~shared/rating';
import { AutoUnsub, translate } from '~utils';

@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService]
})
export class SupplierPreviewComponent extends AutoUnsub implements OnChanges, OnInit {
	formConfig = new DynamicFormConfig({ mode: 'editable-text' });
	@Input() supplier: Supplier;
	@Input() canClose = true;
	/** wether we display it as a preview or part of a component (supplier details) */
	@Input() isPreview = true;
	// whether we reselect / subscribe to item given the supplier id
	@Input() shouldSelect = true;
	@Output() close = new EventEmitter<null>();

	@ViewChild(PreviewCommentComponent, { static: false }) previewComment: PreviewCommentComponent;
	@ViewChild(SampleCatalogComponent, { read: ElementRef, static: false }) sampleCatalog: ElementRef;
	@ViewChild(TaskCatalogComponent, { read: ElementRef, static: false }) taskCatalog: ElementRef;
	@ViewChild(RatingDashboardComponent, { read: ElementRef, static: false }) ratingDashboard: ElementRef;

	supplier$: Observable<Supplier>;
	supplierDescirptor: SupplierDescriptor;
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private supplierSrv: SupplierService,
		private commentSrv: CommentService,
		private previewSrv: PreviewService,
		private router: Router,
		private dlgSrv: DialogService,
		private uploaderFeedbackSrv: UploaderFeedbackService,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		public dialogCommonSrv: DialogCommonService,
		public translateService: TranslateService) {
		super();
	}

	ngOnInit() {
		this.supplierDescirptor = new SupplierDescriptor([
			'name', ERM.SUPPLIER_TYPE.singular, 'generalMOQ', 'generalLeadTime', 'country',
			'address', 'harbour', 'incoTerm', 'website', 'officeEmail', 'officePhone',
			'createdBy', 'creationDate', 'lastUpdatedBy', 'lastUpdatedDate'
		]);

		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "supplier.extendedFields"', sortBy: 'order' });
	}

	ngOnChanges() {
		if (this.shouldSelect && this.supplier) {
			this.supplier$ = this.supplierSrv.selectOne(this.supplier.id)
				.pipe(takeUntil(this._destroy$));
			this.supplier$.subscribe(s => this.supplier = s);
		} else {
			this.supplier$ = of(this.supplier);
		}
	}

	// UPDATE FUNCTIONS
	updateSupplier(supplier: Supplier) {
		this.supplierSrv.update({ id: this.supplier.id, ...supplier }).subscribe();
	}

	update(value: any, prop: string) {
		this.supplierSrv.update({ id: this.supplier.id, [prop]: value }).subscribe();
	}

	addComment(comment: Comment) {
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		// const commentUser = { ...comment, createdBy: this.userSrv.userSync };
		const commentUser = { ...comment };
		const comments = [...(this.supplier.comments || [])];
		comments.push(commentUser);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.supplierSrv.update({ id: this.supplier.id, comments }))
		).subscribe();
	}

	delete(supplier: Supplier) {
		const text = `Are you sure you want to delete this supplier ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.supplierSrv.delete(supplier.id)),
				tap(prod => {
					this.close.emit();
				})
			).subscribe();
	}

	archive() {
		const text = `Are you sure you want to archive this supplier ?`;
		const action = 'archive';
		this.dlgSrv.open(ConfirmDialogComponent, { text, action })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				tap(_ => {
					this.update(true, 'archived');
					this.close.emit();
				}),
			).subscribe();
	}

	deleteImage(image: AppImage) {
		const images = this.supplier.images.filter(img => image.id !== img.id);
		this.supplierSrv.update({ id: this.supplier.id, images }).subscribe();
	}

	// ACTIONS
	openCreateSample() {
		this.dialogCommonSrv.openCreationSampleDialog(null, this.supplier).subscribe();
	}

	openCreateTask() {
		this.dialogCommonSrv.openCreationTaskDlg(null, this.supplier).subscribe();
	}

	/** opens the modal carousel */
	openModal(index: number) {
		this.selectedIndex = index;
		this.modalOpen = true;
	}

	/** closes the modal */
	closeModal() {
		this.modalOpen = false;
	}

	redirect(subroute?: string) {
		subroute ?
			this.router.navigate(['suppliers', this.supplier.id, subroute]) :
			this.router.navigate(['suppliers', this.supplier.id]);
	}

	getLocationName(supplier) {
		let locName = '-';
		if (supplier) {
			if (supplier.city && supplier.country)
				locName = supplier.city + ', ' + translate(supplier.country, 'country');
			else if (supplier.city)
				locName = supplier.city;
			else
				locName = translate(supplier.country, 'country');
		}
		return locName;
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

}
