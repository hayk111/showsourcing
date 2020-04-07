import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FieldDescriptor } from '~core/erm3/models';

@Component({
	selector: 'dynamic-field-app',
	templateUrl: './dynamic-field.component.html',
	styleUrls: ['./dynamic-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFieldComponent implements OnInit {
	@Input() field: FieldDescriptor;
	@Input() value: any;
	// This will change when using control value accessor but I've to
	// refactor the input module first
	@Output() blurEvent = new EventEmitter<any>();
	@Output() inputEvent = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

}
