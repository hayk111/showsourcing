import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';
import { DynamicField } from '~shared/dynamic-forms/models';
import { TemplateService } from '~core/template/services/template.service';
import { RequestTemplateService } from '~core/entity-services';
import { ExtendedFieldDefinitionService } from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { Observable, throwError } from 'rxjs';
import { ExtendedFieldDefinition } from '~core/models';

/**
 * Component that selects the correct input and display it as an editable text
 *
 * Most inputs wait for a blur event to update, therefor we use an accumulator,
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
				this.definitions$ = this.extendedFieldDefSrv.queryMany({ query: `target == "${this.customField.metadata.target}"` });
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

	get labelName() {
		return this.customField.metadata.labelName || 'name';
	}
}
