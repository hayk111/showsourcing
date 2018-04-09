import { Component, OnInit, ChangeDetectionStrategy, AfterContentChecked, ContentChildren, QueryList } from '@angular/core';
import { ListItemComponent } from '~app/shared/list/list-item/list-item.component';

@Component({
	selector: 'list-app',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements AfterContentChecked {

	@ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;

	/** Removes the border of the list item */
	ngAfterContentChecked(): void {
		this.items.last.border = false;
	}

}
