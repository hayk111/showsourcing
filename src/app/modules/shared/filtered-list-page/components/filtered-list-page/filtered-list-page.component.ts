import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { FilterGroupName, FilterClass } from '../../../../store/model/misc/filter.model';
import { selectFilterPanelOpen } from '../../../../store/selectors/ui/filter-panel.selector';
import { selectViewSwitcher } from '../../../../store/selectors/ui/view-switcher.selector';
import { FilterPanelAction } from '../../../../store/action/ui/filter-panel.action';

@Component({
	selector: 'filtered-list-page-app',
	templateUrl: './filtered-list-page.component.html',
	styleUrls: ['./filtered-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredListPageComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() filterClasses: Array<FilterClass>;
	@Input() pending = true;
	filterPanelOpen$: Observable<boolean>;
	view$: Observable<string>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.filterPanelOpen$ = this.store.select(selectFilterPanelOpen);
		this.view$ = this.store.select(selectViewSwitcher);
	}

	openFilters() {
		this.store.dispatch(FilterPanelAction.open());
	}

}
