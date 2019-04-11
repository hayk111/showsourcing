import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { Observable } from 'rxjs';


@Component({
	selector: 'navbar-app',
	templateUrl: './navbar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent extends TrackingComponent implements OnInit {

	@Input() tabs: Array<{ name: string, number$: Observable<number> }> = [];
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
