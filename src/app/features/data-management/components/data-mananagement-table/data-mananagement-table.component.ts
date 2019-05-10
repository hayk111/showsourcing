import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { EntityMetadata, ERM } from '~models';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMananagementTableComponent extends ListViewComponent<any> {
	@Input() entityMetadata: EntityMetadata;
	@Output() renameEntity = new EventEmitter<any>();
	// if the id entity matches with an id of the array, we display add/remove button
	ermCategory = ERM.CATEGORY;
	ermTag = ERM.TAG;
	ermEvent = ERM.EVENT;
	idEntityHovered: string;

	updateNameEntity(obj, newName, subProp?) {
		if (subProp) {
			obj[subProp].name = newName;
		} else {
			obj.name = newName;
		}
		delete obj.suppliers;
		delete obj.products;
		this.renameEntity.emit(obj);
	}
	onHover(id: string) {
		this.idEntityHovered = id;
	}
}
