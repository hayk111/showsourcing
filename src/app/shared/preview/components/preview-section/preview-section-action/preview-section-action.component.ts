import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'preview-section-action-app',
	templateUrl: './preview-section-action.component.html',
	styleUrls: ['./preview-section-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewSectionActionComponent {

	constructor() { }

}
