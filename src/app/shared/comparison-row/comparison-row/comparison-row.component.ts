import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { ComparisonRowTemplateDirective } from './comparison-row-template.directive';

@Component({
	selector: 'comparison-row-app',
	templateUrl: './comparison-row.component.html',
	styleUrls: ['./comparison-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexBetween'
	}
})
export class ComparisonRowComponent {
	@Input() values: string[];
	@Input() label: string;
	@Input() checked: boolean;
	@Input() hasCheckbox = true;
	@Output() selected = new EventEmitter<null>();
	@Output() unselected = new EventEmitter<null>();
	@ContentChild(ComparisonRowTemplateDirective, { static: false, read: TemplateRef }) template: ComparisonRowTemplateDirective;

	constructor() { }

}
