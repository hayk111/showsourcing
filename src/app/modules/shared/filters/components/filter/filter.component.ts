// import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// import { EntityState, Entity, EntityRepresentation, entityRepresentationMap } from '../../../../store/utils/entities.utils';
// import { Filter, FilterGroupName, FilterRepresentation, filterRepresentationMap } from '../../../../store/model/filter.model';
// import { FilterActions } from '../../../../store/action/filter.action';
// import { MiscActions } from '../../../../store/action/misc.action';
// import { merge } from 'rxjs/operators/merge';
// import { selectFilterForEntity, selectFilterForEntities } from '../../../../store/selectors/filter.selectors';
// import { FilterSelectionPanelAction } from '../../../../store/action/filter-selection-panel.action';
// import { combineLatest } from 'rxjs/observable/combineLatest';

// @Component({
// 	selector: 'filter-app',
// 	templateUrl: './filter.component.html',
// 	styleUrls: ['./filter.component.scss'],
// 	changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class FilterComponent implements OnInit {
// 	// filter group name design wich filter group the component is associated to
// 	// for example productPage
// 	@Input() filterGroupName: FilterGroupName;
// 	// filterRepresentation is kind of an helper class that has info on how to translate
// 	// to an urlName. For example the suppliers flter is written supplier when doing the http req
// 	@Input() filterRepr: FilterRepresentation;
// 	items$: Observable<Array<Filter>>;

// 	constructor(private store: Store<any>) { }

// 	ngOnInit() {
// 		// select all items selected for target filterRepr
// 		this.items$ = this.store.select(selectFilterForEntities(this.filterGroupName, this.filterRepr.displayedFilters));
// 	}

// 	openFilterListPanel() {
// 		// setting the target entityRepr of filterSelectionPanel so it knows which filter panel to display
// 		this.store.dispatch(FilterSelectionPanelAction.open(this.filterRepr));
// 	}

// 	// we remove filter when the close icon is clicked
// 	removeFilter(id: string, repr: FilterRepresentation) {
// 		this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, repr, id));
// 	}

// }
