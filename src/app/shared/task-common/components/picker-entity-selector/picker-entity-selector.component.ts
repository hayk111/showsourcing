import { Component, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '~models/user.model';
import { PickerService } from '~shared/picker';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';

@Component({
	selector: 'picker-entity-selector-app',
	templateUrl: './picker-entity-selector.component.html',
	styleUrls: ['./picker-entity-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[style.top]': 'event.srcElement.offsetTop + \'px\'',
		'[style.left]': 'event.srcElement.offsetLeft + \'px\'',
	}
})
export class PickerEntitySelectorComponent implements AfterViewInit {

	@Input() event: MouseEvent;
	@Input() callback: Function;
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	user: User;

	constructor(private pickerSrv: PickerService) { console.log(event); }

	ngAfterViewInit() {
		setTimeout(_ => this.selector.selector.open(), 50);
	}

	close() {
		this.pickerSrv.close();
	}

	updateAssignee(user: User) {
		this.user = user;
		this.callback(this.user);
		this.close();
	}
}
