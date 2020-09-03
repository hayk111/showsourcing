import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
	Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ReplaySubject, Subject, from, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap, debounce, debounceTime, first, last } from 'rxjs/operators';
import { Descriptor, PropertyDescriptor } from '~core/erm3/models';
import { SectionWithColumns } from '~shared/descriptor/interfaces/section-with-columns.interface';
import { DescriptorService } from '~shared/descriptor/services/descriptor.service';
import { log } from '~utils/log';
import * as _ from 'lodash';
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
	@Input() entity: any;
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
	private _destroy$ = new Subject<void>();

	initialized = false;

	get valid() {
		return this.formGroup.valid;
	}

	constructor(
		private fb: FormBuilder,
		private descriptorSrv: DescriptorService,
		private cd: ChangeDetectorRef) { }

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges) {
		const colChanged = changes.columnAmount &&
			changes.columnAmount.previousValue !== changes.columnAmount.currentValue;
		const updateOnChanged = changes.updateOn &&
			changes.updateOn.previousValue !== changes.updateOn.currentValue;
		const sectionChanged = changes.section &&
			changes.section.previousValue !== changes.section.currentValue;
		const styleChanged = changes.style && changes.style.previousValue !== changes.style.currentValue;
		const entityChanged = !(_.isEqual(changes?.entity?.previousValue, changes?.entity?.currentValue));

		/**
		 * Creating form columns based on @section input provided
		 */
		if (changes.section && (colChanged || sectionChanged)) {
			this.makeColumns();
		}

		/**
		 * Building real form group based on @section input provided and
		 * filling the form with data provided via @properties input
		 */
		if ((changes.section && (sectionChanged || updateOnChanged)) || entityChanged) {
			this.buildFormGroup();
		}

		if (styleChanged) {
			this.cd.markForCheck();
		}
	}

	/**
	 * Function to call when form field value is updated
	 */
	onFormUpdate() {
		const updatedFields = _.pickBy(this.formGroup.value, (val, key) => !!this.formGroup.value[key]);

		Object.keys(updatedFields).forEach(key => {
			if (key.toLowerCase().includes('id')) {
				updatedFields[key.slice(0, key.toLowerCase().indexOf('id'))] = updatedFields[key][key] || updatedFields[key]?.id;
				delete updatedFields[key];
			} else {
				updatedFields[key] = updatedFields[key];
			}
		});

		this.update.emit(updatedFields);
	}

	reset() {
		const value = this.descriptorSrv.descriptorToValueObject(this.section);
		this.formGroup.reset(value);
	}

	/**
	 * Put the custom fields into columns
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

	/**
	 * Function that builds form group based on descriptor @section input
	 */
	private buildFormGroup() {
		this.formGroup = this.descriptorSrv.descriptorToFormGroup(this.section, { updateOn: this.updateOn });
		const updateVal = {
			...this.entity.propertiesMap,
			name: this.entity.name,
			supplierId: this.entity?.supplier,
			categoryId: this.entity?.category,
		};

		this.formGroup.patchValue(updateVal, { emitEvent: false });

		log.debug('built form group', this.formGroup);
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

}
