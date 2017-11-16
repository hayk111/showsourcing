import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-info-request-stepper',
	templateUrl: './info-request-stepper.component.html',
	styleUrls: ['./info-request-stepper.component.scss']
})
export class InfoRequestStepperComponent implements OnInit {
	formArray = new FormArray([ new FormGroup({}), new FormGroup({ name: new FormControl('', Validators.required)}) ]);
	constructor(private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			const token = params['token'];
			console.log(token);
		});
	}

}
