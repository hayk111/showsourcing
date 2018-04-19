import {
	Component, OnInit, ChangeDetectionStrategy, Input, HostBinding,
	ContentChildren, AfterContentChecked, QueryList
} from '@angular/core';
import { Log } from '~app/app-root/utils';

@Component({
	selector: 'list-item-app',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'pointer' }
})
export class ListItemComponent {
	@Input() @HostBinding('class.selected') selected;
	@Input() border = true;
	@Input() padding = 'm';
	constructor() { }


}
