import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
	selector: 'generic-error-page-app',
	templateUrl: './generic-error-page.component.html',
	styleUrls: ['./generic-error-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericErrorPageComponent {
}

