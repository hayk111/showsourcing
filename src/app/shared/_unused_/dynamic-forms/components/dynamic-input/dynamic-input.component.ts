import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef,
	ViewChild, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { DynamicFormControl, DynamicFormGroup } from '../../utils/dynamic-controls.class';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { AutoUnsub } from '~utils/index';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlDescriptor } from '../../utils/descriptors.interface';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'dynamic-input-app',
	templateUrl: './dynamic-input.component.html',
	styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent extends AutoUnsub implements OnInit {
	@Input() group: FormGroup;
	@Input() ctrl: FormControl;
	@Input() descriptor: FormControlDescriptor;
	@Output() update = new EventEmitter<any>();
	// CUSTOM FIELDS : we have to input the property name because of customFields
	@Input() propertyName: string;


	constructor(private resolver: ComponentFactoryResolver,
							private dynamicFormsSrv: DynamicFormsService) {
		super();
	}

	ngOnInit() {
	}

	onUpdate(name, value) {
		this.update.emit({ name, value });
	}

	isStandard() {
		const type = this.descriptor.fieldType;
		return type === 'text' || type === 'number' || type === 'url' || type === 'email' || type === 'decimal'
			|| type === 'date';
	}


}
