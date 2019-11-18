import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'portal-area-app',
	templateUrl: './portal-area.component.html',
	styleUrls: ['./portal-area.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalAreaComponent {

	@Input() isOpen;

}
