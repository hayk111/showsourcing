import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Filter, FilterGroupName } from '../../../store/model/filter.model';
import { selectFilterGroup } from '../../../store/selectors/filter.selectors';
import { DynamicFormsService } from '../../../shared/dynamic-forms/services/dynamic-forms.service';
import { FormBuilder } from '@angular/forms';
import { AppErrorActions } from '../../../store/action/app-errors.action';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	group;
	ctrl = new FormControl('sfdfsd');
	ctrl2;
	constructor(private dynamicFormsSrv: DynamicFormsService, private fb: FormBuilder, private store: Store<any>) { }

	ngOnInit() {
	// this.group = this.dynamicFormsSrv.toDynamicFormGroup(customFieldsMock.groups[0]);
		// this.ctrl2 = this.dynamicFormsSrv.toDynamicFormControl(customFieldsMock.groups[0].fields[0]);
		// this.group = this.fb.group({
		// 	test: ['sdfsdf']
		// });
	}

	throw() {
		this.store.dispatch(AppErrorActions.add('this is una error'));
	}
}

const customFieldsMock = {
	groups: [
	{ name: 'Basic info',
	'fields': [
		{'name': 'supplierId', 'label': 'supplier', placeholder: 'test', 'fieldType': 'standard'},
		{'name': 'categoryId', 'label': 'category', 'fieldType': 'standard'},
		{'name': 'status', 'label': 'status', 'fieldType': 'standard'},
		{'name': 'eventId', 'label': 'event', 'fieldType': 'standard'},
		{'name': 'name', 'label': 'name', 'fieldType': 'standard'},
		{'name': 'rating', 'label': 'rating', 'fieldType': 'standard'},
		{'name': 'priceAmount', 'label': 'priceAmount', 'fieldType': 'standard'},
		{'name': 'priceCurrency', 'label': 'priceCurrency', 'fieldType': 'standard'},
		{'name': 'minimumOrderQuantity', 'label': 'minimumOrderQuantity', 'fieldType': 'standard'},
		{'name': 'description', 'label': 'description', 'fieldType': 'standard'},
		{'name': 'tags', 'label': 'tags', 'fieldType': 'standard'},
		{'name': 'projects', 'label': 'projects', 'fieldType': 'standard'}
	]
}]};
