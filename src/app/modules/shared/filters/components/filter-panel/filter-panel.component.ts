import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { Observable } from 'rxjs/Observable';
import { MiscActions } from '../../../../store/action/misc.action';
import { Router, NavigationEnd } from '@angular/router';
import { FilterActions } from '../../../../store/action/filter.action';

@Component({
  selector: 'filter-panel-app',
  templateUrl: './filter-panel.component.html',
	styleUrls: ['./filter-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush	
})
export class FilterPanelComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	panelVisible$: Observable<boolean>;
	search = '';

  constructor(private store: Store<any>) { }

  ngOnInit() {
		this.panelVisible$ = this.store.select(dotSelector('misc.filterItemListPanel.open'));
	}
	
	close() {
		this.store.dispatch(MiscActions.setProperty('filterPanel', 'open', false));
	}

	clear() {
		this.store.dispatch(FilterActions.clearGroup(this.filterGroupName));
	}
}
