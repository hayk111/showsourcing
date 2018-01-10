import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { Observable } from 'rxjs/Observable';
import { MiscActions } from '../../../../store/action/misc.action';
import { Router, NavigationEnd } from '@angular/router';
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterSelectionPanelAction } from '../../../../store/action/filter-selection-panel.action';
import { FilterPanelAction } from '../../../../store/action/filter-panel.action';
import { selectFilterPanelOpen } from '../../../../store/selectors/filter-panel.selector';
import { selectFilterSelectionPanelOpen } from '../../../../store/selectors/filter-selection-panel.selector';

@Component({
	selector: 'filter-panel-app',
	templateUrl: './filter-panel.component.html',
	styleUrls: ['./filter-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	subPanelVisible$: Observable<boolean>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.subPanelVisible$ = this.store.select(selectFilterSelectionPanelOpen);
	}

	close() {
		this.store.dispatch(FilterPanelAction.close());
	}

	clear() {
		this.store.dispatch(FilterActions.clearGroup(this.filterGroupName));
	}
}
