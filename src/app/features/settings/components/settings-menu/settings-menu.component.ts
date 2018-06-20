import {
	Component, Output, EventEmitter,
	ContentChildren, QueryList,
	AfterContentInit, Input
} from '@angular/core';

import { SettingsMenuItemComponent } from '../settings-menu-item/settings-menu-item.component';

@Component({
	selector: 'settings-menu-app',
	templateUrl: './settings-menu.component.html',
	styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent implements AfterContentInit {
	@Input() menuIcon: string;
	@Input() menuTitle: string;
	@Output() expanded = new EventEmitter<boolean>();
	@ContentChildren(SettingsMenuItemComponent) items: QueryList<SettingsMenuItemComponent>;

	internalExpanded = false;

	onToggleExpanded() {
		this.internalExpanded = !this.internalExpanded;
		this.expanded.emit(this.internalExpanded);
		this.triggerChangesToItems(this.internalExpanded);
	}

	ngAfterContentInit() {
		this.triggerChangesToItems(this.internalExpanded);
		this.registerListenersOnItems();
	}

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
