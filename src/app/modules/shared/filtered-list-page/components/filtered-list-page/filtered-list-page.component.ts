import { Component, OnInit, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { MiscActions } from '../../../../store/action/misc.action';
import { MatTableDataSource } from '@angular/material';
import { FilterPanelAction } from '../../../../store/action/filter-panel.action';

@Component({
	selector: 'filtered-list-page-app',
	templateUrl: './filtered-list-page.component.html',
	styleUrls: ['./filtered-list-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredListPageComponent implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	@Input() pending = true;
	filterPanelOpen$: Observable<boolean>;
	view$: Observable<string>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.filterPanelOpen$ = this.store.select('filterPanel').map(fp => fp.open);
		this.view$ = this.store.select('viewSwitcher');
	}

	openFilters() {
		this.store.dispatch(FilterPanelAction.open());
	}

}
