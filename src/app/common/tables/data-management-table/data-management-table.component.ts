import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { EntityMetadata, ERM } from '~models';
import { TranslateService } from '@ngx-translate/core';
import { defaultConfig } from '../default-columns/default-config';


const tableConfig: TableConfig = {
	...defaultConfig,
	action: { name: 'action', translationKey: 'action', width: 120, fixedWidth: true }
};

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-management-table.component.html',
	styleUrls: ['./data-management-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataManagementTableComponent extends EntityTableComponent<any> {
	@Input() entityMetadata: EntityMetadata;
	@Output() renameEntity = new EventEmitter<any>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	// if the id entity matches with an id of the array, we display add/remove button
	ermCategory = ERM.CATEGORY;
	ermTag = ERM.TAG;
	ermSupplier = ERM.SUPPLIER;
	ermEvent = ERM.EVENT;
	idEntityHovered: string;
	tableConfig: TableConfig = tableConfig;
	columns = [
		'name',
		'createdBy',
		'productCount',
		'supplierCount',
		'action',
	];


	constructor(public translate: TranslateService) { super(); }

	updateNameEntity(isCancel: boolean, obj, newName, subProp?) {
		if (isCancel) return;
		let item;
		// this subprop is needed cause we acces the event.description.name
		if (subProp)
			item = { id: obj.id, [subProp]: { name: newName } };
		else
			item = { id: obj.id, name: newName };

		this.renameEntity.emit(item);
	}

	onHover(id: string) {
		this.idEntityHovered = id;
	}
}
