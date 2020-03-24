import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { EntityMetadata, ERM } from '~core/erm';
import { TranslateService } from '@ngx-translate/core';
import { defaultConfig } from '../default-columns/default-config';


const tableConfig: TableConfig = {
	...defaultConfig,
	action: { name: 'action', translationKey: 'action', width: 120, fixedWidth: true }
};

@Component({
	selector: 'list-management-table-app',
	templateUrl: './list-management-table.component.html',
	styleUrls: ['./list-management-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListManagementTableComponent extends EntityTableComponent<any> {
	static DEFAULT_COLUMNS = [
		'name',
		'createdBy',
		'productCount',
		'supplierCount',
		'action',
	];
	static DEFAULT_TABLE_CONFIG = tableConfig;
	@Input() columns = ListManagementTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = ListManagementTableComponent.DEFAULT_TABLE_CONFIG;
	// TODO CHANGE EntityMetadata by Typename
	@Input() entityMetadata: EntityMetadata;
	@Output() renameEntity = new EventEmitter<any>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	// if the id entity matches with an id of the array, we display add/remove button
	ermCategory = ERM.CATEGORY;
	ermTag = ERM.TAG;
	ermSupplier = ERM.SUPPLIER;
	ermEvent = ERM.EVENT;
	idEntityHovered: string;

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

	capitalize(txt: string): string {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	}
}
