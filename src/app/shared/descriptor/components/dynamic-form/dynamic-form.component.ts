import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
	Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ReplaySubject, Subject, from, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap, debounce, debounceTime, first, last } from 'rxjs/operators';
import { Descriptor, PropertyDescriptor } from '~core/erm3/models';
import { SectionWithColumns } from '~shared/descriptor/interfaces/section-with-columns.interface';
import { DescriptorService } from '~shared/descriptor/services/descriptor.service';
import { log } from '~utils/log';
import _ from 'lodash';
import { Typename, api } from 'showsourcing-api-lib';

const	toUpdate = false;

@Component({
	selector: 'dynamic-form2-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
	@Input() typename: Typename;
	@Input() entityId: string;
	@Input() section: SectionWithColumns;
	@Input() style: 'form' | 'editable' = 'form';
	@Input() columnAmount = 1;
	@Input() updateOn: 'blur' | 'change' = 'change';
	@Input() showRequiredMarker = true;
	@Input() properties = {};
	// keeping "descriptor" here in order not to have compile errors, this should be removed
	@Input() descriptor: Descriptor;
	@ViewChild('formElem', { static: true }) formElem: ElementRef<HTMLFormElement>;
	@Output() update = new EventEmitter<{}>();
	/** used to display the fields inside columns */
	/** form group for the form */
	formGroup: FormGroup = this.fb.group({name: ''});
	/** when a new formgroup is created */
	private currentFormGroupSub = [];
	private _destroy$ = new Subject<void>();

	get valid() {
		return this.formGroup.valid;
	}

	constructor(
		private fb: FormBuilder,
		private descriptorSrv: DescriptorService,
		private cd: ChangeDetectorRef) {}

	ngOnInit() {
		this.currentFormGroupSub.push(this.subscribeOnValueChanges(this.formGroup));

		api.Product.get(this.entityId)
			.subscribe(product => {
			this.formGroup = this.descriptorSrv.descriptorToFormGroup(this.section, { updateOn: this.updateOn });
			this.formGroupUnsubscribe();
			this.cd.markForCheck();
			this.formGroup.patchValue({
				...product.propertiesMap,
				name: product.name,
				supplierId: product.supplierId,
				categoryId: product.categoryId,
			}, { emitEvent: false });
			this.currentFormGroupSub.push(this.subscribeOnValueChanges(this.formGroup));
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		const colChanged = changes.columnAmount &&
			changes.columnAmount.previousValue !== changes.columnAmount.currentValue;
		const updateOnChanged = changes.updateOn &&
			changes.updateOn.previousValue !== changes.updateOn.currentValue;
		const sectionChanged = changes.section &&
			changes.section.previousValue !== changes.section.currentValue;
		const styleChanged = changes.style && changes.style.previousValue !== changes.style.currentValue;

		if (changes.section && (colChanged || sectionChanged)) {
			this.makeColumns();
		}

		if (changes.section && (sectionChanged || updateOnChanged)) {
			this.buildFormGroup();
		}

		// if (propertiesChanged) {
		// 	this.formGroup.patchValue({...this.properties });
		// 	this.cd.markForCheck();
		// }

		if (styleChanged) {
			this.cd.markForCheck();
		}
	}

	subscribeOnValueChanges(formGroup: FormGroup): Subscription {
		return from(formGroup.valueChanges).pipe(
			// switchMap(group => group.valueChanges),
			// removing properties with "falsy" values
			map(properties => _.pickBy(properties, (val, key) => !!properties[key])),
			map(properties => {
				const returnObj: any = {};
				// TODO: remove this block, temporary solution for properties with key containing "Id"
				// - like supplierId, categoryId, etc
				Object.keys(properties).forEach(key => {
					if (key.toLowerCase().includes('id')) {
						returnObj[key] = properties[key][key];
					} else {
						returnObj[key] = properties[key];
					}
				});

				return returnObj;
			}),
			debounceTime(400),
			takeUntil(this._destroy$),
		).subscribe(properties => {
			this.update.emit(properties);
		});
	}

	reset() {
		const value = this.descriptorSrv.descriptorToValueObject(this.section);
		this.formGroup.reset(value);
	}

	/** put the custom fields into columns
	 * If we have only one column then we will have one column with all the fields
	 * If we have two columns we will have 2 columns with each half the field, etc..
	 */
	private makeColumns() {
		const propertyDescriptors = this.section.properties;
		const fieldPerCol = Math.ceil(propertyDescriptors.length / this.columnAmount);
		const columns: PropertyDescriptor[][] = [];
		for (let i = 0; i < this.columnAmount; i++) {
			const start = i * fieldPerCol;
			const end = i * fieldPerCol + fieldPerCol;
			columns[i] = propertyDescriptors.slice(start, end);
		}
		const sectionWithColumn = { ...this.section, columns };
		this.section = sectionWithColumn;
		log.debug('made columns', this.section);
		return sectionWithColumn;
	}

	isEqual(val1, val2) {
		if ((!val1 || !Object.keys(val1).length) && (!val2 || !Object.keys(val2).length)) {
			return true;
		}
		return _.isEqual(val1, val2);
	}

	private buildFormGroup() {
		this.formGroup = this.descriptorSrv.descriptorToFormGroup(this.section, { updateOn: this.updateOn });
		this.formGroup.patchValue({...this.properties}, { emitEvent: false });
		log.debug('built form group', this.formGroup);
	}

	private formGroupUnsubscribe() {
		[...this.currentFormGroupSub].forEach(subscription => subscription.unsubscribe());
		this.currentFormGroupSub = [];
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
		this.formGroupUnsubscribe();
	}

}
