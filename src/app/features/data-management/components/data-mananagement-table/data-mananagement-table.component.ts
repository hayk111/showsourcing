import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '~models';
import { Sort } from '~shared/table/components/sort.interface';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMananagementTableComponent {
	@Input() items: Array<any>;
	@Input() selected: Map<string, boolean>;
	@Input() pending = true;
	@Output() entitySelect = new EventEmitter<string>();
	@Output() entityUnselect = new EventEmitter<string>();
	@Output() entitySelectAll = new EventEmitter<Map<string, boolean>>();
	@Output() entityUnselectAll = new EventEmitter<null>();
	@Output() entityOpen = new EventEmitter<string>();
	@Output() sort = new EventEmitter<any>();
	@Output() addEntity = new EventEmitter<any>();
	@Output() removeEntity = new EventEmitter<any>();
	// if the id entity matches with an id of the array, we display add/remove button
	idEntityHovered: string;

	onHover(id: string) {
		this.idEntityHovered = id;
	}

}
