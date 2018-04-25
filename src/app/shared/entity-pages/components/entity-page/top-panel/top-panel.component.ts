import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { FilterGroupName, Filter } from '~shared/filters/models';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityRepresentation } from '~app/entity';

@Component({
	selector: 'top-panel-app',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelComponent {
	/** The name of the filter group so we can automatically add filters when adding things  */
	@Input() filterGroupName: FilterGroupName;
	/** whether we should display the filter icon */
	@Input() hasFilter = true;
	/** title of the bread crumb */
	@Input() title: string;
	/** subtitles of the bread crumb */
	@Input() subtitles: Array<string>;

	// whether the screen can be switched from table to list view
	@Input() hasSwitch = true;
	// view that can be switched into
	@Input() view: 'list' | 'card';
	// when said view changes
	@Output() viewChange = new EventEmitter<string>();

	/** what appears in the button on the right for adding an entity */
	@Input() buttonName: string;
	/** when said button is clicked */
	@Output() buttonClick = new EventEmitter<any>();
	// when the filter button is clicked
	@Output() filterClick = new EventEmitter<null>();


}
