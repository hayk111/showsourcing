import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { selectUserTeamId } from 'app/features/user/store/selectors/user.selector';
import { Log } from '~utils';

import { selectEntityArray } from '~entity/store/selectors';
import { Entity, EntityRepresentation } from '~entity/models';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class FilterEntityPanelService {
	teamId: string;

	constructor(private http: HttpClient, private store: Store<any>) {
		this.store.select(selectUserTeamId).subscribe(id => (this.teamId = id));
	}

	getItemsWithCount(rep: EntityRepresentation) {
		return combineLatest(
			this.getItems(rep),
			this.getCount(rep),
			(items, counts) => {
				return this.combineItemAndCount(items, counts);
			}
		);
	}

	getItems(entityRepr: EntityRepresentation) {
		return this.store.select(selectEntityArray(entityRepr));
	}

	private getCount(entityRepr: EntityRepresentation) {
		// get urlName for said target
		let itemUrlName = entityRepr.urlName;
		// capitalizing because that url needs to be
		itemUrlName = itemUrlName.charAt(0).toUpperCase() + itemUrlName.slice(1);
		return this.http
			.get(`/api/team/${this.teamId}/countProdsBy${itemUrlName}`)
			.pipe(map((r: any) => r.items), startWith({}));
	}

	private combineItemAndCount(
		items: Array<Entity>,
		counts: { [key: string]: number }
	) {
		Log.debug('combining items and counts for filters');
		items = items.map(item => ({
			id: item.id,
			name: item.name,
			count: counts[item.id],
		}));
		items = items.sort((a: any, b: any) => (b.count || 0) - (a.count || 0));
		return items;
	}
}
