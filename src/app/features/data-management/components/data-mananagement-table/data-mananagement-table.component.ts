import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, EntityMetadata, ERM } from '~models';
import { Sort } from '~shared/table/components/sort.interface';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMananagementTableComponent {
	@Input() entityMetadata: EntityMetadata;
	@Input() items: Array<any>;
	@Input() selected: Map<string, boolean>;
	@Input() pending = true;
	@Output() entitySelect = new EventEmitter<string>();
	@Output() entityUnselect = new EventEmitter<string>();
	@Output() entitySelectAll = new EventEmitter<Map<string, boolean>>();
	@Output() entityUnselectAll = new EventEmitter<null>();
	@Output() entityOpen = new EventEmitter<string>();
	@Output() sort = new EventEmitter<Sort>();
	@Output() renameEntity = new EventEmitter<any>();
	@Output() removeEntity = new EventEmitter<string>();
	// if the id entity matches with an id of the array, we display add/remove button
	ermCategory = ERM.CATEGORY;
	ermSupplier = ERM.SUPPLIER;
	ermEvent = ERM.EVENT;
	ermProduct = ERM.PRODUCT;
	idEntityHovered: string;

	onHover(id: string) {
		this.idEntityHovered = id;
	}

}
