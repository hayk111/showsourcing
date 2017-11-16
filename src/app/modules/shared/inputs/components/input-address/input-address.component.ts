import { Component, OnInit, Injector, forwardRef, Input } from '@angular/core';
import { FormBuilderService } from '../../../form-builder/services/form-builder.service';
import { FormBuilder, Validators, FormGroup, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlDescriptor } from '../../../form-builder/interfaces/form-control-descriptor.interface';
import { FormGroupDescriptor } from '../../../form-builder/interfaces/form-group-descriptor.interface';
import { FormDescriptor } from '../../../form-builder/interfaces/form-descriptor.interface';
import { AbstractInput } from '../../abstract-input.class';

@Component({
	selector: 'input-address-app',
	templateUrl: './input-address.component.html',
	styleUrls: ['./input-address.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputAddressComponent),
			multi: true
		}
	]
})
export class InputAddressComponent extends AbstractInput {
	address = { fullAddress: '', zip: '', city: '', state: '', country: '' };

	constructor(protected inj: Injector) {
		super(inj);
	}

}


const DESCRIPTORS = [
				{ name: 'fullAddress', type: 'text', label: 'Full Address', placeholder: 'Sunan Plaza, Heifel, Ahui, China' },
				{ name: 'city', type: 'text', label: 'City', placeholder: 'Heifel' },
				{ name: 'zip', type: 'number', label: 'Zip', placeholder: '21000' },
				{ name: 'state', type: 'text', label: 'State', placeholder: 'Ahui' },
				{ name: 'country', type: 'text', label: 'Country', placeholder: 'China' }
			];
