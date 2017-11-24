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
import { selectEntitiesWithChecked } from '../../../../store/selectors/filter.selectors';
import { FilterGroupName, EntityRepresentation } from '../../../../store/model/filter.model';
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
	providers: [ CounterService ]
})
export class FilterItemListComponent extends AutoUnsub implements OnInit {
	@Input() filterGroupName: FilterGroupName;
	entityRep: EntityRepresentation;
	entityRep$ = new Observable<EntityRepresentation>();
	items$: Observable<EntityState<any>>;
	itemsWithCount$: Observable<any>;
	search = '';
	private teamId: string;
	private countStr = 'countProdsBy';


	constructor(private store: Store<any>,
							private counterSrv: CounterService) {
		super();
	}

	ngOnInit() {
		// we first select the user to get the teamId
		this.store.select('user').subscribe((user: User) => {
			this.teamId = user.currentTeamId;
		});
		// then we select the entityRep for the filter selection panel to know what entity
		// we want to display
		this.entityRep$ = this.store.select('filterSelectionPanel').map(fsp => fsp.target);
		this.counterSrv.init(this.filterGroupName);
		// when entityRep is received we launch onTargetReceived
		this.itemsWithCount$ = this.entityRep$
		.do(t => this.entityRep = t)
		.do(t => this.items$ = this.store.select(selectEntitiesWithChecked(this.filterGroupName, t)))
		.pipe(
			filter(t => t !== undefined),
			distinctUntilChanged(),
			switchMap((t: EntityRepresentation) => this.counterSrv.getItemsWithCount(t))
		);
	}

	onChange(event, itemName, itemId) {
		if (event.checked)
			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this.entityRep, itemName, itemId));
		else
			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.entityRep, itemId));
	}


}
