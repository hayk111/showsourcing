import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'playground-page-app',
	templateUrl: './playground-page.component.html',
	styleUrls: ['./playground-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundPageComponent {



	test() {
		// Test function
	}

}
