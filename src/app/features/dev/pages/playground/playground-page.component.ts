import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import gql from 'graphql-tag';
import { FilterService } from '~core/filters';
import { Category } from '~core/erm3/models';

@Component({
	selector: 'playground-page-app',
	templateUrl: './playground-page.component.html',
	styleUrls: ['./playground-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundPageComponent implements OnInit {
	constructor(private listFuseHelper: ListFuseHelperService<Category>, private filterSrv: FilterService) {}

	ngOnInit() {
		this.listFuseHelper.setup(
			'Category',
			gql`
				query ListCategorys($filter: ModelCategoryFilterInput, $limit: Int, $nextToken: String) {
					listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
						__typename
						items {
							__typename
							id
							teamId
							team {
								__typename
								id
								name
								ownerUserId
								companyId
								createdByUserId
								createdOn
								lastUpdatedByUserId
								lastUpdatedOn
								_version
								_deleted
								_lastChangedAt
							}
							name
							deleted
							_version
							_deleted
							_lastChangedAt
						}
						nextToken
						startedAt
					}
				}
			`,
			{ teamId: '353c0206-fa91-489b-bfb7-e896aeb7e25a', limit: 1000}
		);

		this.listFuseHelper.getFilteredItems$
	}

	handleInput(e) {
		const value = e.target.value;
		console.log('search ' + value);
		this.filterSrv.search(value);
	}


	test() {
		// Test function
	}
}
