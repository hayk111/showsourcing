import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'side-panel-title-app',
	template: '<ng-content></ng-content>',
	styles: [`
	:host {
		font-family: 'Raleway';
		font-size: var(--font-size-l);
		font-weight: 600;
		color: var(--color-txt-strong);
	}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelTitleComponent {

}
