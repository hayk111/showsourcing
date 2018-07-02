import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'side-panel-action-app',
	template: '<ng-content></ng-content>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelActionComponent {

}
