import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Supplier } from '~models';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AutoUnsub } from '~utils';
import { takeUntil, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPreviewComponent extends AutoUnsub implements OnInit {
	@Input() supplier: Supplier;

	@Output() close = new EventEmitter<undefined>();
	/** at first the supplier is the one in the list but it hasn't got all info so we gonna query it again */
	supplier$: Observable<Supplier>;
	descriptor$ = new Subject<FormDescriptor>();

	customFields: CustomField[] = [
		{ name: 'name', type: 'text', label: 'Name' },
		{
			name: 'supplierType',
			type: 'selector',
			metadata: { target: 'supplierType', type: 'entity', canCreate: true, labelName: 'name' },
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
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', canCreate: true }, label: 'tags', multiple: true }
	];

	constructor(private router: Router, private featureSrv: SupplierFeatureService) {
		super();
	}

	ngOnInit() {
		// getting the supplier with all the data
		this.supplier$ = this.featureSrv.selectOne(this.supplier.id);
		this.supplier$.pipe(
			takeUntil(this._destroy$),
			map(supplier => new FormDescriptor(this.customFields, supplier)),
		).subscribe(this.descriptor$);
	}

	update(supplier: Supplier) {
		this.featureSrv.update({ id: this.supplier.id, ...supplier }).subscribe();
	}

	onFavorited() {
		this.update({ favorite: true });
	}

	onUnfavorited() {
		this.update({ favorite: false });
	}

	goToDetails() {
		this.router.navigate(['supplier', 'details', this.supplier.id]);
	}

	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				distinctUntilChanged()
			)
			.subscribe(supplier => this.update(supplier));
	}
}
