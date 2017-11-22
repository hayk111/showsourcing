import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState } from '../../../../store/utils/entities.utils';
import { FilterById } from '../../utils/filter-by-id';
import { Subject } from 'rxjs/Subject';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { takeUntil } from 'rxjs/operators';
import { FilterActions } from '../../../../store/action/filter.action';
import { selectFiltersWithChecked } from '../../../../store/selectors/filter.selectors';
import { FilterGroupName, FilterTarget, getUrlForTarget } from '../../../../store/model/filter.model';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { filter } from 'rxjs/operators/filter';
import { MiscActions } from '../../../../store/action/misc.action';
import { CounterService } from '../../services/counter.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../store/model/user.model';
import { combineLatest } from 'rxjs/operators';
// when we filter an entity in the store this is the reused panel

@Component({
	selector: 'filter-item-list-app',
	templateUrl: './filter-item-list.component.html',
	styleUrls: ['./filter-item-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterItemListComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	target: FilterTarget;
	target$ = new Observable<string>();
	itemsWithCount$: Observable<any>;
	items$: Observable<any>;
	search = '';
	private teamId: string;


	constructor(private store: Store<any>,
							private http: HttpClient) {
		super();
	}

	ngOnInit() {
		this.store.select('user').subscribe((user: User) => {
			this.teamId = user.currentTeamId;
		});
		this.target$ = this.store.select(dotSelector('misc.filterSelectionPanel.target'));
		this.itemsWithCount$ = this.target$.pipe(
			filter(t => t !== undefined),
			distinctUntilChanged(),
			switchMap((t: FilterTarget) => this.onTargetReceived(t))
		);
	}

	private onTargetReceived(t: FilterTarget) {
		this.target = t;
		this.items$ = this.store.select(selectFiltersWithChecked(this.filterGroupName, t));
		// adding count to items
		let itemUrlName = getUrlForTarget(t);
		itemUrlName = itemUrlName.charAt(0).toUpperCase() + itemUrlName.slice(1);
		const count$ = this.http.get(`/api/team/${this.teamId}/countProdsBy${itemUrlName}`)
			.map((r: any) => r.items);
		return this.items$.pipe(
			combineLatest(count$, (items, counts) => {
				const returned = [];
				Object.entries(counts).forEach( ([k, v]) => {
					items.byId[k].count = v;
					returned.push(items.byId[k]);
				});
				returned.sort((a, b) => b.count - a.count);
				return returned;
			}));
	}

	onChange(event, itemName, itemId) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this.target, itemName, itemId));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.target, itemId));
	}

}
