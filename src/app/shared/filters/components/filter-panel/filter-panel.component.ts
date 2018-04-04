import { Component, Input, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Entity, EntityRepresentation } from '~entity/store/entity.model';

import { Filter, FilterGroupName } from '../../models';
import { FilterActions, FilterEntityPanelActions, FilterPanelAction } from '../../store/actions';
import { selectFEPChoices, selectFiltersByName, selectFiltersForClass } from '../../store/selectors';

@Component({
	selector: 'filter-panel-app',
	templateUrl: './filter-panel.component.html',
	styleUrls: ['./filter-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class FilterPanelComponent {
	@Output() reset = new EventEmitter<null>();
}
