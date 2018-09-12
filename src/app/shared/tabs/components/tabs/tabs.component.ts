import { Component, OnInit, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '~shared/tabs/components/tab/tab.component';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'tabs-app',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss']
})
export class TabsComponent extends BaseComponent implements OnInit, AfterContentInit {
	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

	constructor() {
    super();
  }

	ngOnInit() {
	}

	// contentChildren are set
	ngAfterContentInit() {
		// get all active tabs
		const activeTabs = this.tabs.filter((tab) => tab.active);
		// if there is no active tab set, activate the first
		if (activeTabs.length === 0) {
			this.selectTab(this.tabs.first);
		}
	}

	selectTab(tab: TabComponent) {
		// deactivate all tabs
		this.tabs.toArray().forEach(atab => atab.active = false);
		// activate the tab the user has clicked on.
		tab.active = true;
	}
}
