import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { TranslateService } from '@ngx-translate/core';
import { defaultConfig } from '../default-columns/default-config';
import { Typename } from '~core/erm3/typename.type';


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
	@Input() typename: Typename;
	@Output() renameEntity = new EventEmitter<any>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	@Output() createClick = new EventEmitter();

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

	capitalize(txt: string): string {
		return txt.charAt(0).toUpperCase() + txt.slice(1);
	}
}
