import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'side-panel-title-app',
	template: '<ng-content></ng-content>',
	styles: [`
	:host {
		font-family: var(--font-title);
		font-size: var(--font-size-l);
		font-weight: 600;
		color: var(--color-txt-primary);
	}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelTitleComponent {

}
