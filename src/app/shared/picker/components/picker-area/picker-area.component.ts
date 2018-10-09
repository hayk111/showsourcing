import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'picker-area-app',
	templateUrl: './picker-area.component.html',
	styleUrls: ['./picker-area.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerAreaComponent {

	@Input() isOpen;

}
