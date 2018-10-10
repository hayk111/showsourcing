import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { User } from '~models/user.model';
import { PickerService } from '~shared/picker';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';

@Component({
	selector: 'picker-entity-selector-app',
	templateUrl: './picker-entity-selector.component.html',
	styleUrls: ['./picker-entity-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerEntitySelectorComponent implements OnInit {

	@HostBinding('style.left')
	left: string;
	@HostBinding('style.top')
	top: string;

	@Input() set event(event: MouseEvent) {
		// this -114 value is constant since it is only for the styling part
		this.posX = (event.pageX - event.offsetX - 114); // with the page and offset we find the element clicked position
		this.left = this.posX + 'px';
		// same for this -5
		this.posY = (event.pageY - event.offsetY - 5);
		this.top = this.posY + 'px';
	}
	@Input() callback: Function;
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	/** user selected from the dropdown */
	user: User;
	/** position click horizontally */
	posX: number;
	/** position click vertically */
	posY: number;

	constructor(private pickerSrv: PickerService) { }

	ngOnInit() {
		// this is done since we have a bug where the first click won't alter the dropdown position (instead of top is bottom)
		// and  we have to add a setTimeout, this way we don't. 650 is the "middle" of the page
		this.selector.selector.ngSelect.dropdownPosition = this.posY > 650 ? 'top' : 'bottom';
		this.selector.open();
	}

	updateAssignee(user: User) {
		this.user = user;
		this.callback(this.user);
		this.close();
	}

	close() {
		this.pickerSrv.close();
	}
}
