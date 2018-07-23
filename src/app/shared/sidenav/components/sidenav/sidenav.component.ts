import {
	Component, Output, EventEmitter,
	ContentChildren, QueryList,
	AfterContentInit, Input
} from '@angular/core';

import { SidenavItemComponent } from '~shared/sidenav/components/sidenav-item/sidenav-item.component';

@Component({
	selector: 'sidenav-app',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterContentInit {
	/** the global menu icon for the navbar */
	@Input() menuIcon: string;
	/** the global menu title for the navbar */
	@Input() menuTitle: string;
	/** the expanded event for the whole navbar */
	@Output() expanded = new EventEmitter<boolean>();
	/** the list of items of the navbar */
	@ContentChildren(SidenavItemComponent) items: QueryList<SidenavItemComponent>;

	/** the internal expanded state for the navbar */
	internalExpanded = false;

	/** toggle the expanded state */
	onToggleExpanded() {
		this.internalExpanded = !this.internalExpanded;
		this.expanded.emit(this.internalExpanded);
		this.triggerChangesToItems(this.internalExpanded);
	}

	ngAfterContentInit() {
		this.triggerChangesToItems(this.internalExpanded);
		this.registerListenersOnItems();
	}

	/** trigger the items to change their expanded state */
	triggerChangesToItems(internalExpanded: boolean) {
		if (this.items) {
			this.items.forEach(item => {
				item.internalExpanded = this.internalExpanded;
				item.ngOnChanges({
					internalExpanded: {
						currentValue: this.internalExpanded,
						previousValue: !this.internalExpanded
					},
					link: item.link
				});
			});
		}
	}

	/** register on items to detect if they trigger an expanded state change.
	 * Typically if an item has sub items and we click on it.
	 */
	registerListenersOnItems() {
		if (this.items) {
			this.items.forEach(item => {
				item.expanded.subscribe(expanded => {
					if (expanded) {
						this.internalExpanded = true;
					}
				});
			});
		}
	}
}
