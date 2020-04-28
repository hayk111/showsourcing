import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter,
	Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Descriptor, PropertyDescriptor } from '~core/erm3/models';
import { SectionWithColumns } from '~shared/descriptor/interfaces/section-with-columns.interface';
import { DescriptorService } from '~shared/descriptor/services/descriptor.service';
import { log } from '~utils/log';


export interface Property {
	name: string;
	value: any;
}

@Component({
	selector: 'dynamic-form2-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
	@Input() descriptor: Descriptor;
	@Input() style: 'form' | 'editable' = 'form';
	@Input() columnAmount = 1;
	@Input() updateOn: 'blur' | 'change' = 'change';
	@Input() showRequiredMarker = true;
	@Input() properties: Property[];
	@ViewChild('formElem', { static: true }) formElem: ElementRef<HTMLFormElement>;
	@Output() update = new EventEmitter<Property[]>();
	/** used to display the fields inside columns */
	sections: SectionWithColumns[];
	/** form group for the form */
	formGroup: FormGroup;
	/** when a new formgroup is created */
	private formGroup$ = new ReplaySubject<FormGroup>(1);
	private _destroy$ = new Subject<void>();

	get valid() {
		return this.formGroup.valid;
	}

	constructor(
		private descriptorSrv: DescriptorService,
		private cd: ChangeDetectorRef) {}

	ngOnInit() {
		this.formGroup$.pipe(
			switchMap(group => group.valueChanges),
			tap(d => this.cd.markForCheck()),
			// we transform it into the array of properties
			map(value => this.descriptorSrv.objectToProperties(value)),
			takeUntil(this._destroy$)
		).subscribe(properties => this.update.emit(properties));
	}

	ngOnChanges(changes: SimpleChanges ) {
		const colChanged = changes.columnAmount &&
			changes.columnAmount.previousValue !== changes.columnAmount.currentValue;
		const updateOnChanged = changes.updateOn &&
			changes.updateOn.previousValue !== changes.updateOn.currentValue;
		const descriptorChanged = changes.descriptor &&
			changes.descriptor.previousValue !== changes.descriptor.currentValue;
		const styleChanged = changes.style &&
			changes.style.previousValue !== changes.style.currentValue;

		if (colChanged || descriptorChanged) {
			this.makeColumns();
		}

		if (descriptorChanged || updateOnChanged) {
			this.buildFormGroup();
		}

		if (styleChanged) {
			this.cd.markForCheck();
		}

	}

	reset() {
		const value = this.descriptorSrv.descriptorToValueObject(this.descriptor);
		this.formGroup.reset(value);
	}

	/** put the custom fields into columns
	 * If we have only one column then we will have one column with all the fields
	 * If we have two columns we will have 2 columns with each half the field, etc..
	 */
	private makeColumns() {
		this.sections = this.descriptor.sections
			.map(section => {
				const propertyDescriptors = section.properties;
				const fieldPerCol = Math.ceil(propertyDescriptors.length / this.columnAmount);
				const columns: PropertyDescriptor[][] = [];
				for (let i = 0; i < this.columnAmount; i++) {
					const start = i * fieldPerCol;
					const end = i * fieldPerCol + fieldPerCol;
					columns[i] = propertyDescriptors.slice(start, end);
				}
				const sectionWithColumn = { ...section, columns };
				return sectionWithColumn;
			});
		log.debug('made columns', this.sections);
	}

	private buildFormGroup() {
		this.formGroup = this.descriptorSrv
			.descriptorToFormGroup(this.descriptor, { updateOn: this.updateOn });
		// patch with existing values
		const values = this.descriptorSrv
				.propertiesToObject(this.properties);
		this.formGroup.patchValue(values);
		this.formGroup$.next(this.formGroup);
		log.debug('built form group', this.formGroup);
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}

}