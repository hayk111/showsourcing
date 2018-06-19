import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '~models';
import { SortEvent } from '~shared/table/components/sort-event.interface';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMananagementTableComponent {
	@Input() categories: Array<Category>;
	@Input() selected: Map<string, boolean>;
	@Input() pending = true;
	@Output() categorySelect = new EventEmitter<string>();
	@Output() categoryUnselect = new EventEmitter<string>();
	@Output() categorySelectAll = new EventEmitter<Map<string, boolean>>();
	@Output() categoryUnselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() categoryOpen = new EventEmitter<string>();
	@Output() sort = new EventEmitter<SortEvent>();
	// if the id entity matches with an id of the array, we display add/remove button
	idEntityHovered: string;

	onHover(id: string) {
		this.idEntityHovered = id;
	}

	addEntity(id: string) {
		// eventemitteraddition
	}

	removeEntity(id: string) {
		// eventemitterdeletion
	}
}
