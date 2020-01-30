import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Packaging } from '~core/erm/models';

@Component({
	selector: 'packaging-app',
	templateUrl: './packaging.component.html',
	styleUrls: ['./packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackagingComponent {

	@Input() packaging: Packaging;

	constructor() { }

}
