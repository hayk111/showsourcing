import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDescriptor } from '../../utils/descriptors.interface';
import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { DynamicFormGroup } from '../../utils/dynamic-controls.class';

@Component({
	selector: 'dynamic-form-group-app',
	templateUrl: './dynamic-form-group.component.html',
	styleUrls: ['./dynamic-form-group.component.scss']
})
export class DynamicFormGroupComponent implements OnInit {
	@Input() group: DynamicFormGroup;

	constructor(private dynamicFormsSrv: DynamicFormsService) {
	}

	ngOnInit() {
	}

}
