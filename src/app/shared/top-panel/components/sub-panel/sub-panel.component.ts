import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ChangeDetectionStrategy } from '@angular/core';
import { Filter } from '~shared/filters/models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'sub-panel-app',
	templateUrl: './sub-panel.component.html',
	styleUrls: ['./sub-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubPanelComponent {
	/** whether we should display the filter icon */
	@Input() hasFilter = true;
	// whether the screen can be switched from table to list view
	@Input() hasSwitch = true;
	// whether the screen has a search input
	@Input() hasSearch = true;
	/** title of the bread crumb */
	@Input() title: string;
	/** subtitles of the bread crumb */
	@Input() subtitles: Array<string>;

	// view that can be switched into
	@Input() view: 'list' | 'card';
	// when said view changes
	@Output() viewChange = new EventEmitter<string>();

	/** what appears in the button on the right for adding an entity */
	@Input() buttonName: string;
	/** specify if the icon should be displayed or not for the adding button */
	@Input() buttonIcon = true;
	/** when said button is clicked */
	@Output() buttonClick = new EventEmitter<any>();
	// when the filter button is clicked
	@Output() filterClick = new EventEmitter<null>();


}