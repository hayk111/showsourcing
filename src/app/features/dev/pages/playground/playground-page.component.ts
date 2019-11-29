import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusUtils, StatusCategory, Color } from '~utils';
@Component({
	selector: 'playground-page-app',
	templateUrl: './playground-page.component.html',
	styleUrls: ['./playground-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundPageComponent {

	lep = StatusUtils.statusColorMap;
	mep = StatusUtils.statusColorMap;

	test() {
		// Test function
		console.log(this.lep);
		this.lep[StatusCategory.NEW] = Color.WARN;
		console.log(this.lep);
		console.log(this.mep);
	}

}
