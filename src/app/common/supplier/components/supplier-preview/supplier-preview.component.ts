import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SupplierService } from '~core/entity-services';
import { CommentService } from '~core/entity-services/comment/comment.service';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { AppImage, Comment, ERM, ExtendedFieldDefinition, Supplier } from '~core/models';
import { CustomField } from '~shared/dynamic-forms';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { AutoUnsub } from '~utils';

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
	@Input() isRelative = false;
	// whether we reselect / subscribe to item given the supplier id
	@Input() shouldSelect = true;
	@Output() close = new EventEmitter<null>();
	/** wether the top image is fixed or not for the scrolling effect*/
	@Input() isFixed = true;

	supplier$: Observable<Supplier>;
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	fieldDefinitions$: Observable<ExtendedFieldDefinition[]>;
	customFields: CustomField[] = [
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{
			name: ERM.SUPPLIER_TYPE.singular,
			type: 'selector',
			metadata: { target: ERM.SUPPLIER_TYPE.singular, type: 'entity', canCreate: false, labelName: 'name' },
			label: 'type'
		},
		{ name: 'generalMOQ', type: 'number', label: 'MOQ' },
		{ name: 'generalLeadTime', type: 'days', label: 'Lead Time' },
		{ name: 'country', type: 'selector', metadata: { target: 'country', type: 'const' }, label: 'country' },
		{ name: 'address', type: 'text', label: 'address' },
		{ name: 'harbour', type: 'selector', metadata: { target: 'harbour', type: 'const' } },
		{ name: ERM.INCOTERM.singular, type: 'selector', metadata: { target: ERM.INCOTERM.singular, type: 'const' } },
		{ name: 'website', type: 'url', label: 'website' },
		{ name: 'officeEmail', type: 'email', label: 'Email', required: true },
		{ name: 'officePhone', type: 'tel', label: 'Tel' }
	];

	constructor(
		private supplierSrv: SupplierService,
		private commentSrv: CommentService,
		private router: Router,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService,
		private constPipe: ConstPipe) {
		super();
	}

	ngOnInit() {
		this.fieldDefinitions$ = this.extendedFieldDefSrv.queryMany({ query: 'target == "Supplier"' });
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
		this.router.navigate(['supplier', 'details', this.supplier.id]);
	}

	getLocationName(supplier) {
		let locName = '-';
		if (supplier) {
			if (supplier.city && supplier.country)
				locName = supplier.city + ', ' + this.constPipe.transform(supplier.country, 'country');
			else if (supplier.city)
				locName = supplier.city;
			else
				locName = this.constPipe.transform(supplier.country, 'country');
		}
		return locName;
	}
}
