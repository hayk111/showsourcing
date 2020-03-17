import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import gql from 'graphql-tag';
import { FilterService } from '~core/filters';
import { Category } from '~core/erm3/models';
import * as Fuse from 'fuse.js';

@Component({
	selector: 'playground-page-app',
	templateUrl: './playground-page.component.html',
	styleUrls: ['./playground-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaygroundPageComponent implements OnInit {
	constructor(
		private listFuseHelper: ListFuseHelperService<Category>,
		private filterSrv: FilterService
	) {}

	teamUsers: Category[] = [];

	ngOnInit() {
		this.filterSrv.setup([], ['team.name']);
		this.listFuseHelper.setup('TeamUser', 'User', 'fa44071b-c21e-4763-82b8-1f59715ea86e');

		this.listFuseHelper.getFilteredItems$().subscribe(d => {
			console.log(d);
			this.teamUsers = d;
		});
	}

	handleInput(e) {
		const value = e.target.value;
		this.filterSrv.search(value);
	}

	test() {
		// Test function
	}
}
