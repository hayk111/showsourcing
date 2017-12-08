import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroupDescriptor, FormDescriptor } from '../../utils/descriptors.interface';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { DynamicFormGroup } from '../../utils/dynamic-controls.class';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { take, switchMap, mergeMap } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { FormGroup } from '@angular/forms';
import { EntityRepresentation, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { selectEntity, selectEntityById } from '../../../../store/selectors/utils.selector';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
	selector: 'dynamic-form-group-app',
	templateUrl: './dynamic-form-group.component.html',
	styleUrls: ['./dynamic-form-group.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormGroupComponent extends AutoUnsub implements OnInit {
	@Output() update = new EventEmitter<any>();
	@Input() formGroup: FormGroup = new FormGroup({});
	formGroupInit$: Observable<boolean>;
	descriptor: FormDescriptor;
	private _entityId: string;

	@Input() entityRepr: EntityRepresentation = entityRepresentationMap.product;
	// we need a behavior subject because the id is set before we subscribe.
	private _entityId$ = new BehaviorSubject<string>(null);

	@Input()
	set entityId(id: string) {
		this._entityId = id;
		this._entityId$.next(id);
	}

	constructor(private dynamicFormsSrv: DynamicFormsService, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		const descriptor$ = this.dynamicFormsSrv.getDescriptor(this.entityRepr)
			.pipe( filter(r => r), take(1) );
		descriptor$
			.takeUntil(this._destroy$)
			.subscribe(desc => this.descriptor = desc);
		// initializes the form with the descriptor
		this.formGroupInit$ = descriptor$
			.takeUntil(this._destroy$)
			.pipe(
				map( desc => this.dynamicFormsSrv.toFormGroup(desc, this.formGroup)),
				map(x => true)
			);
		// when we get a new id we need to patch the form.
		// But the form must be ready.
		this.formGroupInit$.pipe(
			switchMap(_ => this._entityId$),
			filter((id: any) => id),
			switchMap(id => this.selectEntity(this.entityRepr, id))
		).subscribe(entity => this.patch(entity));
	}

	private selectEntity(entityRepr: EntityRepresentation, entityId: string) {
		return this.store.select(selectEntityById(entityRepr.entityName, entityId));
	}

	private patch(entity) {
		this.formGroup.reset();
		this.formGroup.patchValue(entity);
	}

	getControl(name: string) {
		debugger;
		return this.formGroup.controls[name];
	}

	onUpdate(event) {
		this.store.dispatch(this.entityRepr.actionType.patch(this._entityId, event.name, event.value));
	}

}


const TEST = {
	groups: [
		{
			name: 'Basic info',
			fields: [
				{
					name: 'supplier',
					label: 'supplier',
					fieldType: 'standard'
				},
				{
					name: 'category',
					label: 'category',
					fieldType: 'standard'
				},
				{
					name: 'event',
					label: 'event',
					fieldType: 'standard'
				},
				{
					name: 'name',
					label: 'name',
					fieldType: 'standard'
				},
				{
					name: 'rating',
					label: 'rating',
					fieldType: 'standard'
				},
				{
					name: 'priceAmount',
					label: 'priceAmount',
					fieldType: 'standard'
				},
				{
					name: 'priceCurrency',
					label: 'priceCurrency',
					fieldType: 'standard'
				},
				{
					name: 'minimumOrderQuantity',
					label: 'minimumOrderQuantity',
					fieldType: 'standard'
				},
				{
					name: 'description',
					label: 'description',
					fieldType: 'standard'
				},
				{
					name: 'tags',
					label: 'tags',
					fieldType: 'standard'
				},
				{
					name: 'projects',
					label: 'projects',
					fieldType: 'standard'
				}
			]
		},
		{
			name: 'Custom fields',
			fields: [
				{
					name: 'freeText',
					label: 'Free text',
					fieldType: 'free-text'
				},
				{
					name: 'textZone',
					label: 'Text zone',
					fieldType: 'text-zone'
				},
				{
					name: 'multipleChoice',
					label: 'Multiple choice',
					fieldType: 'multiple-choice',
					enumerationName: 'choices'
				},
				{
					name: 'user',
					label: 'User',
					fieldType: 'user'
				},
				{
					name: 'supplier',
					label: 'Supplier',
					fieldType: 'supplier'
				},
				{
					name: 'checkBox',
					label: 'Check-box',
					fieldType: 'check-box'
				},
				{
					name: 'number',
					label: 'Number',
					fieldType: 'number'
				},
				{
					name: 'customPrice',
					label: 'Custom price',
					fieldType: 'price'
				},
				{
					name: 'date',
					label: 'Date',
					fieldType: 'date'
				},
				{
					name: 'decimalNumber',
					label: 'Decimal number',
					fieldType: 'decimal-number'
				}
			]
		},
		{
			name: 'Pouet',
			fields: [
				{
					name: 'fournisseur',
					label: 'Fournisseur',
					fieldType: 'supplier'
				}
			]
		}
	]
}