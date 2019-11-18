import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

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
