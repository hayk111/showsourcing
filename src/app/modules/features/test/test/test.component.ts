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

	ngOnInit() {

	}
}
