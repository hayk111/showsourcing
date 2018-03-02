import { LoadParams } from '~shared/entity/utils';
import { Filter } from '~shared/filters';

// entities are loaded different ways.

// 1. api/country. The first way and most simple way is api followed
// by the name of the entity, ex: api/country.
// this is for static entities, mainly

// 2. api/team/:teamId/product. The second is by loading entities for a team

// 3. api/team/:teamId/product/comments. The third way is for loading entities
// related to another.

// 4. Same for entities that are intrinsic to the user exmple api/user/team

export class UrlBuilder {

	static TAKE = 100;

	constructor() {
	}

	static getUrl(params: LoadParams) {
		let url = `${params.url}?`;

		if (params.pagination)
			url += `take=${params.take || UrlBuilder.TAKE }&drop=${params.drop}`;

		if (params.filters)
			url += UrlBuilder.filtersAsParams(params.filters);

		return url;
	}

	private static filtersAsParams(filters: Array<Filter>) {
		return filters.reduce((prev: string, curr: Filter) => prev += `${curr.toUrlParam()}&`, '');
	}

}
