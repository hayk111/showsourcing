import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';

export class TabModel {
	title?: string;
	link?: string;
}

@Component({
	selector: 'navbar-app',
	templateUrl: './navbar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent extends TrackingComponent implements OnInit {
	@Input() tabs: TabModel[] = [];
	@Input() currentTab = '';
	@Output() didChangeTab = new EventEmitter<string>();

	constructor() {
		super();
	}

	ngOnInit() {
	}

	changeTab(newTab: string) {
		this.currentTab = newTab;
		if (this.didChangeTab) {
			this.didChangeTab.emit(newTab);
		}
	}
}
