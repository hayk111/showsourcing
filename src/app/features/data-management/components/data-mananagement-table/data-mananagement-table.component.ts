import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { EntityMetadata, ERM } from '~models';
import { TranslateService } from '@ngx-translate/core';

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
