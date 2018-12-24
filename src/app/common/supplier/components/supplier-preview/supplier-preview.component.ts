import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AutoUnsub } from '~utils';
import { Supplier, ERM, AppImage } from '~core/models';
import { Observable } from 'rxjs';
import { CustomField } from '~shared/dynamic-forms';
import { SupplierService, ContactService } from '~core/entity-services';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { takeUntil, switchMap } from 'rxjs/operators';
import { CommentService } from '~core/entity-services/comment/comment.service';

@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPreviewComponent extends AutoUnsub implements OnInit {

	@Input() set supplier(value: Supplier) {
		this._supplier = value;
	}

	@Output() close = new EventEmitter<null>();
	@Input() canClose = true;
	@Input() isRelative = false;

	supplier$: Observable<Supplier>;
	private _supplier: Supplier;
	selectedIndex = 0;
	modalOpen = false;
	erm = ERM;

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{
			name: 'supplierType',
			type: 'selector',
			metadata: { target: 'supplierType', type: 'entity', canCreate: false, labelName: 'name' },
			label: 'type'
		},
		{ name: 'generalMOQ', type: 'number', label: 'MOQ' },
		{ name: 'generalLeadTime', type: 'days', label: 'Lead Time' },
		{ name: 'country', type: 'selector', metadata: { target: 'country', type: 'const' }, label: 'country' },
		{ name: 'address', type: 'text', label: 'address' },
		{ name: 'harbour', type: 'selector', metadata: { target: 'harbour', type: 'const' } },
		{ name: 'incoTerm', type: 'selector', metadata: { target: 'incoTerm', type: 'const' } },
		{ name: 'website', type: 'url', label: 'website' },
		{ name: 'officeEmail', type: 'email', label: 'Email', required: true },
		{ name: 'officePhone', type: 'tel', label: 'Tel' },
		{
			name: 'categories', type: 'selector', metadata: {
				target: 'category', type: 'entity', canCreate: true
			}, label: 'categories', multiple: true
		},
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', labelName: 'name', canCreate: true }, multiple: true },


	];

	constructor(
		private supplierSrv: SupplierService,
		private commentSrv: CommentService,
		private constPipe: ConstPipe) {
		super();
	}

	ngOnInit() {
		this.supplier$ = this.supplierSrv.selectOne(this._supplier.id);
		this.supplier$.pipe(takeUntil(this._destroy$))
			.subscribe(s => this._supplier = s);
	}

	update(value: any, prop: string) {
		this.supplierSrv.update({ id: this._supplier.id, [prop]: value }).subscribe();
	}

	// dyanmic form update
	updateSupplier(supplier: Supplier) {
		this.supplierSrv.update({ id: this._supplier.id, ...supplier }).subscribe();
	}

	addComment(comment: Comment) {
		const comments = [...(this._supplier.comments || [])];
		comments.push(comment as any);
		this.commentSrv.create(comment).pipe(
			switchMap(_ => this.supplierSrv.update({ id: this._supplier.id, comments }))
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
		const images = this._supplier.images.filter(img => image.id !== img.id);
		this.supplierSrv.update({ id: this._supplier.id, images }).subscribe();
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
