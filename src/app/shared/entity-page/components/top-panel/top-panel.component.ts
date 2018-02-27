import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { FilterGroupName } from '~store/model/misc/filter.model';
import { EntityRepresentation } from '~store/utils/entities.utils';

@Component({
	selector: 'top-panel-app',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPanelComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() repr: EntityRepresentation;
	@Input() switchable = true;
	@Input() view: 'list' | 'card';
	@Output() createClick = new EventEmitter<any>();
	@Output() viewChange = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	onClick() {
		this.createClick.emit();
	}

}
