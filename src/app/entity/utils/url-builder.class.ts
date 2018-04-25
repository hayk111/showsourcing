import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiParams, Pagination, Sort } from '~entity/utils';
import { Filter, FilterType } from '~shared/filters/models/filter.model';
import { EntityService } from '~entity/store/entity.service';
import { ERM, EntityRepresentation, EntityTarget } from '~entity/store/entity.model';
import { User } from '../store/user';
import { UserService } from '~app/features/user/services/user.service';
// entities are target different ways.

// 1. api/country. The first way and most simple way is api followed
// by the name of the entity, ex: api/country.
// this is for static entities, mainly

// 2. api/team/:teamId/product. The second is by loading entities for a team

// 3. api/team/:teamId/product/:productId/comment. The third way is for loading entities
// related to another.

// 4. Same for entities that are intrinsic to the user exmple api/user/team

@Injectable()
export class UrlBuilder {
	static TAKE = 30;

	/** adds filters to a request so we can filter on the back-end */
	static addFilters(url: string, filters: Array<Filter> = []) {
		filters.forEach(filter => {
			// for each filter we need to add it to the url.
			switch (filter.type) {
				case FilterType.FAVORITE:
					url = url + 'rating=5&';
					break;
				case FilterType.ARCHIVED:
					url = url + 'withArchived=true&';
					break;
				case FilterType.PRODUCT_STATUS:
					url = url + 'status=' + filter.value + '&';
					break;
				default:
					url = url + filter.type + '=' + filter.value + '&';
			}
		});
		return url;
	}

	/** adds the sorting to an url  */
	static addSorting(url: string, sorting: Sort) {
		if (sorting) {
			return url + `sortBy=${sorting.sortBy}&sortOrder=${sorting.sortOrder}&`;
		}
		return url;
	}

	/** adds pagination to a request */
	static addPagination(url: string, pagination: Pagination) {
		if (pagination) {
			url += `take=${pagination.take || UrlBuilder.TAKE}&drop=${pagination.drop || 0}&`;
		}
		return url;
	}

	/** adds filters, sorting and pagination all at once */
	static addParams(url: string, params: ApiParams) {
		url += `?`;
		url = UrlBuilder.addPagination(url, params.pagination);
		url = UrlBuilder.addFilters(url, params.filters);
		url = UrlBuilder.addSorting(url, params.sort);
		return url;
	}

	constructor(private store: Store<any>, private userSrv: UserService) { }

	getUrl(params: ApiParams, user: User): string {
		return params.url || this.buildUrl(params, user);
	}

	private buildUrl(params: ApiParams, user: User) {
		// we need to be able to build
		// 1. api/team
		// 2. api/team/:teamId/product
		// 3. api/team/:teamId/product/:productId/comment
		let url = 'api';
		const base = params.base;
		const from = params.from;
		const target = params.target;
		const targetId = params.targetId;

		if (base) {
			url = this.addBase(url, base, user);
		}
		if (from) {
			url = this.addFrom(url, from);
		}
		url = this.addTarget(url, target, targetId);
		url = UrlBuilder.addParams(url, params);
		return url;
	}

	// this adds the base which can be user or team with the correct id.
	private addBase(url: string, base: EntityRepresentation, user: User) {
		if (base !== ERM.user && base !== ERM.team) {
			throw Error(
				`UrlBuilder: Base ${
				base.urlName
				} not supported, supported bases are user and team, if you need to load a static entity do it via loaded.`
			);
		}
		if (base === ERM.team) {
			url += `/team/${user.currentTeamId}`;
		} else {
			url += `/user/${user.id}`;
		}
		return url;
	}

	// for example when loading comment : api/team/id/product/id2/comment from is product
	private addFrom(url: string, from: EntityTarget) {
		return `${url}/${from.entityRepr.urlName}/${from.entityId}`;
	}

	// add the target entity
	private addTarget(url: string, target: EntityRepresentation, targetId?: string) {
		url = `${url}/${target.urlName}`;
		if (targetId) url += `/${targetId}`;
		return url;
	}


}
