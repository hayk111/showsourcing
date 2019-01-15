import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
	selector: 'tooltip-app',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {

	@ViewChild('tooltip') tooltip: TemplateRef<any>;

	constructor() { }

	getStyle(bound, transform) {
		const style = bound ? {
			top: bound.y + 'px',
			left: bound.x + 'px',
			transform
		} : {};
		return style;
	}
}
