import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewSwitcherAction } from '../../../../store/action/ui/view-switcher.action';

@Component({
	selector: 'top-panel-app',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss']
})
export class TopPanelComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
