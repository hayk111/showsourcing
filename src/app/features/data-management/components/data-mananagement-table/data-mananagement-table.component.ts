import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Category, EntityMetadata, ERM } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { ListViewComponent } from '~shared/list-page/list-view.component';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMananagementTableComponent extends ListViewComponent<any> {
	@Input() entityMetadata: EntityMetadata;
	@Output() renameEntity = new EventEmitter<any>();
	@Output() removeEntity = new EventEmitter<string>();
	// if the id entity matches with an id of the array, we display add/remove button
	ermCategory = ERM.CATEGORY;
	ermTag = ERM.TAG;
	ermEvent = ERM.EVENT;
	idEntityHovered: string;

  updateNameEntity(obj, newName) {
    obj.name = newName;
    this.renameEntity.emit(obj);
  }
	onHover(id: string) {
		this.idEntityHovered = id;
	}
}
