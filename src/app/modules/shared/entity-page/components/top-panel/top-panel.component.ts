import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewSwitcherAction } from '../../../../store/action/ui/view-switcher.action';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { EntityRepresentation } from '../../../../store/utils/entities.utils';

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
	constructor() { }

	ngOnInit() {
	}

}
