import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef,
	ViewChild, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { DynamicFormControl, DynamicFormGroup } from '../../utils/dynamic-controls.class';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { entityRepresentationMap } from '../../../../store/model/filter.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlDescriptor } from '../../utils/descriptors.interface';

@Component({
	selector: 'dynamic-form-control-app',
	templateUrl: './dynamic-form-control.component.html',
	styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent extends AutoUnsub implements OnInit {
	@Input() group: FormGroup;
	@Input() ctrl: FormControl;
	@Input() descriptor: FormControlDescriptor;
	@Output() change = new EventEmitter<any>();

	constructor(private resolver: ComponentFactoryResolver,
							private dynamicFormsSrv: DynamicFormsService) {
		super();
	}

	ngOnInit() {
	}

	onChange(name, value) {
		this.change.emit({ name, value });
	}

	isEntitySelect() {
		const f = this.descriptor.name;
		const isStandard = this.descriptor.fieldType === 'standard';
		return isStandard && (f === 'supplier' || f === 'category' || f === 'event' || f === 'status');
	}

	getEntityRep(name: string) {
		return Object.values(entityRepresentationMap).find(repr => repr.urlName === name);
	}


	isStandard() {
		const type = this.descriptor.fieldType;
		const name = this.descriptor.name;
		return type === 'free-text' || type === 'standard' && name === 'name';
	}

}
