import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { FilterGroupName } from '~shared/filters';
import { EntityRepresentation } from '~entity';

@Component({
	selector: 'top-panel-app',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPanelComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() repr: EntityRepresentation;
	// whether the screen can be switched
	@Input() switchable = true;
	// view that can be switched into
	@Input() view: 'list' | 'card';

	// when the create button is clicked
	@Output() createClick = new EventEmitter<any>();
	@Output() viewChange = new EventEmitter<string>();
	// when the filter button is clicked
	@Output() filterClick = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

	onClick() {
		this.createClick.emit();
	}

}
