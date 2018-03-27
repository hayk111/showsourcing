import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiParams } from '~entity/utils';
import { Filter } from '~shared/filters';
import { EntityService } from '~entity/store/entity.service';
import { ERM, EntityRepresentation, EntityTarget } from '~entity/store/entity.model';
import { User } from '../store/user';
import { UserService } from '~app/features/user/services/user.service';
// entities are target different ways.

// 1. api/country. The first way and most simple way is api followed
// by the name of the entity, ex: api/country.
// this is for static entities, mainly

// 2. api/team/:teamId/product. The second is by loading entities for a team

// 3. api/team/:teamId/product/:productId/comments. The third way is for loading entities
// related to another.

// 4. Same for entities that are intrinsic to the user exmple api/user/team

@Injectable()
export class UrlBuilder {
	static TAKE = 30;

	constructor(private store: Store<any>, private userSrv: UserService) { }

	getUrl(params: ApiParams, user: User): string {
		let url;
		// if we have url as a string we can use it, else we gotta build it
		if (params.url) {
			url = params.url;
		} else {
			url = this.buildUrl(params, user);
		}
		// adding query params
		url = this.addParams(url, params);
		return url;
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
		return url;
	}

	// this adds the base which can be user or team with the correct id.
	private addBase(url: string, base: EntityRepresentation, user: User) {
		if (base !== ERM.user && base !== ERM.teams) {
			throw Error(
				`UrlBuilder: Base ${
				base.urlName
				} not supported, supported bases are user and teams, if you need to load a static entity do it via loaded.`
			);
		}
		if (base === ERM.teams) {
			url += `/team/${user.currentTeamId}`;
		} else {
			url += `/user/${user.id}`;
		}
		return url;
	}

	// for example when loading comments : api/team/id/product/id2/comment from is product
	private addFrom(url: string, from: EntityTarget) {
		return `${url}/${from.entityRepr.urlName}/${from.entityId}`;
	}

	// add the target entity
	private addTarget(url: string, target: EntityRepresentation, targetId?: string) {
		url = `${url}/${target.urlName}`;
		if (targetId) url += `/${targetId}`;
		return url;
	}

	private addParams(url: string, params: ApiParams) {
		url = `${url}?`;

		if (params.filters) {
			url += this.filtersAsParams(params.filters);
		}

		if (params.pagination) {
			url += `take=${params.take || UrlBuilder.TAKE}&drop=${params.drop || 0}`;
		}
		return url;
	}

	private filtersAsParams(filters: Array<Filter>) {
		return filters.reduce((prev: string, curr: Filter) => (prev += `${curr.toUrlParam()}&`), '');
	}
}
