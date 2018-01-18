// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Store } from '@ngrx/store';
// import { User } from '../../../store/model/user.model';
// import { FilterGroupName } from '../../../store/model/filter.model';
// import { combineLatest } from 'rxjs/operators';
// import { selectUser } from '../../../store/selectors/user.selector';
// import { EntityRepresentation } from '../../../store/utils/entities.utils';

// @Injectable()
// export class CounterService {
// 	private teamId: string;
// 	private countStr = '';
// 	private filterGroupName: FilterGroupName;

// 	constructor(private http: HttpClient, private store: Store<any>) {
// 		this.store.select(selectUser).subscribe((user: User) => {
// 			this.teamId = user.currentTeamId;
// 		});
// 	}

// 	init(filterGroupName: FilterGroupName) {
// 		this.filterGroupName = filterGroupName;
// 		switch (filterGroupName) {
// 			case FilterGroupName.PRODUCT_PAGE:
// 				this.countStr = 'countProdsBy';
// 				return;
// 			case FilterGroupName.TASKS_PAGE:
// 				this.countStr = 'countTasksBy';
// 				return;
// 			default: this.countStr = 'countProdsBy';
// 		}
// 	}

// 	getItemsWithCount(t: FilterRepresentation) {
// 		// get items observable
// 		const items$ = this.store.select(selectEntitiesWithChecked(this.filterGroupName, t));
// 		// get count observable
// 		const count$ = this.getCount(t);
// 		// returning the items with their count
// 		return items$.pipe(
// 			combineLatest(count$, (items, counts) => this.combineItemAndCount(items, counts) ));
// 	}

// 	private getCount(entityRepr: EntityRepresentation) {
// 		// get urlName for said target
// 		let itemUrlName = entityRepr.urlName;
// 		// capitalizing because that url needs to be
// 		itemUrlName = itemUrlName.charAt(0).toUpperCase() + itemUrlName.slice(1);
// 		// TODO: ask renaud for a more standard api url
// 		// api/team/teamId/:entityName/countBy/:entityName
// 		return this.http.get(`/api/team/${this.teamId}/countProdsBy${itemUrlName}`)
// 			.map((r: any) => r.items);
// 	}

// 	private combineItemAndCount(items, counts) {
// 		// if items are not loaded yet
// 		if (items.ids.length === 0)
// 			return [];
// 		const returned = [];
// 		// for each count we add the count value to item and push item into returned
// 		Object.entries(counts).forEach( ([k, v]) => {
// 			const item = items.byId[k];
// 			if (item) {
// 				item.count = v;
// 				returned.push(items.byId[k]);
// 			}
// 		});
// 		returned.sort((a, b) => b.count - a.count);
// 		return returned;
// 	}


// }
