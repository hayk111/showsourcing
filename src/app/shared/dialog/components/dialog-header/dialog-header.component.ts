import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'dialog-header-app',
	templateUrl: './dialog-header.component.html',
	styleUrls: ['./dialog-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'first-uppercase'
	}
})
export class DialogHeaderComponent {


}
