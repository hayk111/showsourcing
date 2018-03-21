import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { FilterGroupName, Filter } from '~shared/filters';
import { EntityRepresentation } from '~entity';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'top-panel-app',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPanelComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() title: string;
	@Input() subtitles: Array<string>;
	@Input() repr: EntityRepresentation;
	// whether the screen can be switched
	@Input() switchable = true;
	// view that can be switched into
	@Input() view: 'list' | 'card';
	@Input() buttonName: string;

	// when the create button is clicked
	@Output() buttonClick = new EventEmitter<any>();
	@Output() viewChange = new EventEmitter<string>();
	// when the filter button is clicked
	@Output() filterClick = new EventEmitter<null>();

	ngOnInit() {
		// if no btn name given let's create one with the entityRepr
		if (!this.buttonName) {
			this.buttonName = 'Add ' + this.repr.displayName;
		}
	}

	onClick() {
		this.buttonClick.emit();
	}
}
