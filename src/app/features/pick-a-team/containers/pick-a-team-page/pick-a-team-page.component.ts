import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'pick-a-team-page-app',
	templateUrl: './pick-a-team-page.component.html',
	styleUrls: ['./pick-a-team-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickATeamPageComponent {
	form: FormGroup;
	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			name: ['', Validators.required]
		});
	}

	onSubmit() {

	}

}
