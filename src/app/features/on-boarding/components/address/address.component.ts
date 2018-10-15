import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'address-app',
	templateUrl: './address.component.html',
	styleUrls: ['./address.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {

	form: FormGroup;
	@ViewChild(InputDirective) input: InputDirective;

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
			country: ['', Validators.required],
			street: ['', Validators.required],
			city: ['', Validators.required],
			pc: ['', Validators.required]
		});
	}

}
