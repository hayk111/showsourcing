import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Descriptor } from '~core/erm3/models';
import { Section } from '~core/erm3/models/section.model';

@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
	@Input() descriptor: Descriptor;
	@Input() style: 'form' | 'text' | 'inline' = 'text';
	@Input() columnAmount = 1;
	columns = [];

	constructor() { }

	ngOnInit() {
	}

}
