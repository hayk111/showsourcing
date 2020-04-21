import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SampleCatalogComponent } from '~common/catalogs/sample-catalog/sample-catalog.component';
import { TaskCatalogComponent } from '~common/catalogs/task-catalog/task-catalog.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierDescriptor } from '~core/descriptors';
import { AppImage, Comment, CommentService, ERM, ExtendedFieldDefinition } from '~core/erm';
import { Supplier } from '~core/erm3/models';
import { ApiService } from '~core/erm3/services/api.service';
import { ListHelperService } from '~core/list-page2';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { PreviewCommentComponent, PreviewService } from '~shared/preview';
import { RatingDashboardComponent } from '~shared/rating';
import { AutoUnsub, translate } from '~utils';

@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierPreviewComponent extends AutoUnsub implements OnInit {
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
	@ViewChild(RatingDashboardComponent, { read: ElementRef, static: false })
	ratingDashboard: ElementRef;

	supplier$: Observable<Supplier>;
	supplierDescirptor: SupplierDescriptor;
	formConfig = new DynamicFormConfig({ mode: 'editable-text', alignValue: 'right' });
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private listHelper: ListHelperService,
		private commentSrv: CommentService,
		private previewSrv: PreviewService,
		private router: Router,
		public dlgCommonSrv: DialogCommonService,
		public translateService: TranslateService,
		private apiSrv: ApiService
	) {
		super();
	}

	ngOnInit() {
		this.supplierDescirptor = new SupplierDescriptor([
			'name',
			ERM.SUPPLIER_TYPE.singular,
			'generalMOQ',
			'generalLeadTime',
			'country',
			'address',
			'harbour',
			'incoTerm',
			'website',
			'officeEmail',
			'officePhone',
			'createdBy',
			'creationDate',
			'lastUpdatedBy',
			'lastUpdatedDate',
		]);

		// this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "supplier.extendedFields"', sortBy: 'order' });
	}

	// UPDATE FUNCTIONS
	updateSupplier(supplier: Supplier) {
		const newSupplier = { ...supplier, id: this.supplier.id, _version: this.supplier._version };
		this.listHelper.update(newSupplier);
		this.supplier = newSupplier;
	}

	update(value: any, prop: string) {
		this.updateSupplier({ [prop]: value });
	}

	addComment(comment: Comment) {
		// if we don't specify the user, when we get out of the preview and then comeback, the info displayed will be without the user info
		// const commentUser = { ...comment, createdBy: this.userSrv.userSync };
		const commentUser = { ...comment };
		const comments = [...(this.supplier.comments || [])];
		comments.push(commentUser);
		this.commentSrv
			.create(comment)
			.pipe(tap((_) => this.listHelper.update({ id: this.supplier.id, comments })))
			.subscribe();
	}

	delete(supplier: Supplier) {
		const text = `Are you sure you want to delete this supplier ?`;
		this.dlgCommonSrv
			.openConfirmDlg({ text })
			.data$.pipe(switchMap((_) => this.apiSrv.delete('Supplier', supplier)))
			.subscribe((_) => this.close.emit());
	}

	archive() {
		const text = `Are you sure you want to archive this supplier ?`;
		const action = 'archive';
		this.dlgCommonSrv.openConfirmDlg({ text, action }).data$.subscribe((_) => {
			this.update(true, 'archived');
			this.close.emit();
		});
	}

	deleteImage(image: AppImage) {
		const images = this.supplier.images.filter((img) => image.id !== img.id);
		this.listHelper.update({ id: this.supplier.id, images });
	}

	// ACTIONS
	openCreateSample() {
		this.dlgCommonSrv.openCreationDlg('Sample', { supplier: this.supplier });
		// TODO create Sample
	}

	openCreateTask() {
		this.dlgCommonSrv.openCreationDlg('Task', { supplier: this.supplier });
		// TODO create Task
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
		subroute
			? this.router.navigate(['suppliers', this.supplier.id, subroute])
			: this.router.navigate(['suppliers', this.supplier.id]);
	}

	getLocationName(supplier) {
		let locName = '-';
		if (supplier) {
			if (supplier.city && supplier.country)
				locName = supplier.city + ', ' + translate(supplier.country, 'country');
			else if (supplier.city) locName = supplier.city;
			else locName = translate(supplier.country, 'country');
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
