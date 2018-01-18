// import { Component, OnInit, Input } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { FilterActions } from '../../../../store/action/filter.action';
// import { FilterGroupName, Filter, filterRepresentationMap } from '../../../../store/model/filter.model';
// import { selectActiveFiltersForTargetEntity, selectFilterValuesForEntity } from '../../../../store/selectors/filter.selectors';
// import { Observable } from 'rxjs/Observable';
// import { entityRepresentationMap } from '../../../../store/utils/entities.utils';

// @Component({
// 	selector: 'with-archived-button-app',
// 	templateUrl: './with-archived-button.component.html',
// 	styleUrls: ['./with-archived-button.component.scss']
// })
// export class WithArchivedButtonComponent implements OnInit {
// 	@Input() filterGroupName: FilterGroupName;
// 	filterRepr = filterRepresentationMap.withArchived;
// 	withArch$: Observable<Array<Filter>>;
// 	isArchived: boolean;

// 	constructor(private store: Store<any>) { }

// 	ngOnInit() {
// 		this.withArch$ = this.store.select(selectFilterValuesForEntity(this.filterGroupName, this.entityRepr));
// 		this.withArch$.subscribe( (fs: Array<Filter>) => this.isArchived = !!(fs[0]));
// 	}

// 	onChange(event) {
// 		let filter;
// 		if (event.checked) {
// 			filter = new Filter(this.filterRepr, )
// 			this.store.dispatch(FilterActions.addFilter(this.filterGroupName, this.entityRepr, 'with archived', true));
// 		} else {
// 			this.store.dispatch(FilterActions.removeFilter(this.filterGroupName, this.entityRepr, true));
// 		}
// 	}
// }
