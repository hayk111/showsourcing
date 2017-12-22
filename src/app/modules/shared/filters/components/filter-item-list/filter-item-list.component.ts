import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EntityState, EntityRepresentation, Entity } from '../../../../store/utils/entities.utils';
import { FilterById } from '../../utils/filter-by-id';
import { Subject } from 'rxjs/Subject';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { takeUntil } from 'rxjs/operators';
import { FilterActions } from '../../../../store/action/filter.action';
import { selectEntitiesWithChecked, selectFilterForEntity, selectFilterValuesForEntity } from '../../../../store/selectors/filter.selectors';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { dotSelector } from '../../../../store/selectors/dot-selector';
import { filter } from 'rxjs/operators/filter';
import { MiscActions } from '../../../../store/action/misc.action';
import { CounterService } from '../../services/counter.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../store/model/user.model';
import { combineLatest } from 'rxjs/operators';
import { selectUser } from '../../../../store/selectors/user.selector';
import { selectFilterPanel } from '../../../../store/selectors/filter-panel.selector';
import { selectFilterSelectionPanelTarget } from '../../../../store/selectors/filter-selection-panel.selector';
import { selectFilesForTarget } from '../../../../store/selectors/file.selector';
import { SelectableItem } from '../../../inputs/components/vanilla/input-checkbox/input-checkbox.component';
import { selectEntityArray } from '../../../../store/selectors/utils.selector';
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
	search = '';
	values: Array<any>;
	choices$: Observable<Array<SelectableItem>>;
	relevantChoices$: Observable<Array<SelectableItem>>;
	private countStr = 'countProdsBy';


	constructor(private store: Store<any>,
							private counterSrv: CounterService) {
		super();
	}

	ngOnInit() {
		// we select the entityRep for the filter selection panel to know what entity
		// we want to display
		this.entityRep$ = this.store.select(selectFilterSelectionPanelTarget);
		this.entityRep$.takeUntil(this._destroy$).subscribe(rep => this.entityRep = rep);
		// can be removed
		this.counterSrv.init(this.filterGroupName);

		// select values
		this.entityRep$.pipe(
			switchMap(repr => this.store.select(selectFilterValuesForEntity(this.filterGroupName, repr))),
			takeUntil(this._destroy$),
		).subscribe(v => this.values = v);

		// select entities
		this.choices$ = this.entityRep$.pipe(
			switchMap(rep => this.store.select(selectEntityArray(rep)))
		);
		// filter only relevant entities
		this.relevantChoices$ = this.entityRep$.pipe(
			switchMap(repr => this.counterSrv.getItemsWithCount(repr)),
		);

	}

	onItemAdded(item) {
		this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this.entityRep, item.name, item.id));
	}

	onItemRemoved(item) {
		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.entityRep, item.id));
	}

}
