import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, Input } from '@angular/core';

@Component({
	selector: 'tooltip-app',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {

	@ViewChild('tooltip') tooltip: TemplateRef<any>;

	constructor() { }

}
