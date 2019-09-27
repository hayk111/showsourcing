import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SupplierDescriptor } from '~core/descriptors';
import { SupplierService } from '~core/entity-services';
import { CommentService } from '~core/entity-services/comment/comment.service';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { AppImage, Comment, ERM, ExtendedFieldDefinition, Supplier } from '~core/models';
import { AutoUnsub, translate } from '~utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPreviewComponent extends AutoUnsub implements OnChanges, OnInit {

	@Input() supplier: Supplier;
	@Input() canClose = true;
	/** wether we display it as a preview or part of a component (supplier details) */
	@Input() isPreview = false;
	// whether we reselect / subscribe to item given the supplier id
	@Input() shouldSelect = true;
	@Output() close = new EventEmitter<null>();

	supplier$: Observable<Supplier>;
	supplierDescirptor: SupplierDescriptor;
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		private supplierSrv: SupplierService,
		private commentSrv: CommentService,
		private router: Router,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
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
		if (this.shouldSelect) {
			this.supplier$ = this.supplierSrv.selectOne(this.supplier.id)
				.pipe(takeUntil(this._destroy$));
			this.supplier$.subscribe(s => this.supplier = s);
		} else {
			this.supplier$ = of(this.supplier);
		}
	}

	update(value: any, prop: string) {
		this.supplierSrv.update({ id: this.supplier.id, [prop]: value }).subscribe();
	}

	// dyanmic form update
	updateSupplier(supplier: Supplier) {
		this.supplierSrv.update({ id: this.supplier.id, ...supplier }).subscribe();
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

	/** opens the modal carousel */
	openModal(index: number) {
		this.selectedIndex = index;
		this.modalOpen = true;
	}

	/** closes the modal */
	closeModal() {
		this.modalOpen = false;
	}

	/** when image is deleted */
	onDelete(image: AppImage) {
		const images = this.supplier.images.filter(img => image.id !== img.id);
		this.supplierSrv.update({ id: this.supplier.id, images }).subscribe();
	}

	openSupplier() {
		this.router.navigate(['supplier', this.supplier.id]);
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
}
