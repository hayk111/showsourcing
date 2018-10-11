import { AfterContentInit, ChangeDetectionStrategy, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { User } from '~models/user.model';
import { PortalService } from '~shared/portal';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';

@Component({
	selector: 'picker-entity-selector-app',
	templateUrl: './picker-entity-selector.component.html',
	styleUrls: ['./picker-entity-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerEntitySelectorComponent implements AfterContentInit {

	@HostBinding('style.left')
	left: string;
	@HostBinding('style.top')
	top: string;

	/** number to adjust the position styling around X axis */
	@Input() offsetX = 114;
	/** number to adjust the positon styling around Y axis */
	@Input() offsetY = 5;
	@Input() set event(event: MouseEvent) {
		// with the page and offset we find the element clicked position
		this.posX = (event.pageX - event.offsetX);
		this.posY = (event.pageY - event.offsetY);
	}
	@Input() callback: Function;
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	/** user selected from the dropdown */
	user: User;
	/** position click horizontally */
	posX: number;
	/** position click vertically */
	posY: number;

	constructor(private portalSrv: PortalService) { }

	ngAfterContentInit() {
		// we set the position of the dropdown
		this.posX -= this.offsetX;
		this.left = this.posX + 'px';
		this.posY -= this.offsetY;
		this.top = this.posY + 'px';
		// this is done since we have a bug where the first click won't alter the dropdown position (instead of top is bottom)
		// and  we have to add a setTimeout, this way we don't. 650 is the "middle" of the page
		this.selector.selector.ngSelect.dropdownPosition = this.posY > 660 ? 'top' : 'bottom';
		this.selector.open();
	}

	updateAssignee(user: User) {
		this.user = user;
		this.callback(this.user);
		this.close();
	}

	close() {
		this.portalSrv.close();
	}
}
