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
import { Validators } from '@angular/forms';
import { RegexpApp } from '../../../../utils/regexes';
import { urlValidator } from '../../../shared/inputs/validators/url.validator';
import { telValidator } from '../../../shared/inputs/validators/tel.validator';
import { intValidator } from '../../../shared/inputs/validators/int.validator';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	name = 'hey';
	textCtrl = new FormControl('ctrl', Validators.required);
	event: any;
	group: FormGroup;
	choices = [
		{ id: '1', name: 'first item'},
		{ id: '2', name: 'second item'},
		{ id: '3', name: 'third item'},
		{ id: '4', name: 'fourth item'}
	];

	constructor(private fb: FormBuilder) {
		this.group = this.fb.group({
			text: ['', Validators.required ],
			number: ['', Validators.compose([Validators.required, intValidator ] )],
			date: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			url: ['', Validators.compose([Validators.required, urlValidator])],
			tel: ['', Validators.compose([Validators.required, telValidator])],
			decimal: ['', Validators.compose([Validators.required])],
			textarea: ['', Validators.required ],
			radio: ['2', Validators.required ],
			checkbox: [['1', '2'], Validators.required ],
		});
	}

	ngOnInit() {

	}

	onBlur(event) {
		console.log(event);
	}

	onUpdate(event) {
		this.event = event;
	}

	getControl(name: string) {
		return this.group.controls[name];
	}
}
