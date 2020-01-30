import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
	ExtendedFieldDefinitionService,
} from '~core/orm/services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldDefinition } from '~core/orm/models';
import { DynamicField } from '~shared/dynamic-forms/models';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';

/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefore we use an accumulator,
 * in case the user cancels.
 */
@Component({
	selector: 'dynamic-input-app',
	templateUrl: './dynamic-input.component.html',
	styleUrls: ['./dynamic-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicInputComponent)]
})
export class DynamicInputComponent extends AbstractInput implements OnInit, AfterViewInit {

	@Input() customField: DynamicField;
	@Input() autofocus = false;
	@Input() config: DynamicFormConfig;
	/** number that specify what index is an input in its column */
	@Input() indexInCol: number;
	@Output() update = new EventEmitter<DynamicUpdate>();
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: any;
	definitions$: Observable<ExtendedFieldDefinition[]>;

	constructor(
		protected cd: ChangeDetectorRef,
		private extendedFieldDefSrv: ExtendedFieldDefinitionService) {
		super(cd);
	}

	ngOnInit() {
		if (this.customField && this.customField.type === 'extendedField')
			if (this.customField.metadata.target)
				this.definitions$ = this.extendedFieldDefSrv.queryMany({ query: `target == "${this.customField.metadata.target}"`, sortBy: 'order' });
			else
				throw new Error('target not defined for extendedField on dynamic inputs');
	}

	ngAfterViewInit() {
		this.accumulator = this.value;
	}

	/** saves the value because an user might cancel */
	accumulate(value: any) {
		this.accumulator = value;
	}

	/** when the value changes */
	onChange() {
		this.onChangeFn(this.accumulator);
		this.update.emit({ [this.customField.name]: this.accumulator });
	}

}
