import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';


@Component({
	selector: 'navbar-app',
	templateUrl: './navbar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent extends TrackingComponent implements OnInit {
	@Input() tabs: string[] = [];
	@Input() values: string[] = [];
	@Input() currentTab = '';
	@Output() tabChange = new EventEmitter<string>();

	constructor() {
		super();
	}

	ngOnInit() {
	}

	changeTab(newTab: string) {
		this.currentTab = newTab;
		if (this.tabChange) {
			this.tabChange.emit(newTab);
		}
	}
}
