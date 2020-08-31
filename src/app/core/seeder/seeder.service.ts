import { Injectable } from '@angular/core';
import { TeamService } from '~core/auth';
import { StatusSeederService } from './status-seeder.service';
import { ListHelper2Service } from '~core/list-page2';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SeederService {

	teamId: string;

	constructor(
		private teamSrv: TeamService,
		private statusSeeder: StatusSeederService,
		private listHelper: ListHelper2Service
	) {
		this.teamSrv.teamSelected$.subscribe(team => {
			this.teamId = team.id;

			const statusQueryOptions = {
				variables: {
					filter: { type: { eq: 'PRODUCT' } }, // trying to fetch the statuses for one of the types
				},
			};

			// this must be updated with the future query lists
			this.listHelper.setup('WorkflowStatus', of(null));
		});
	}

	/* create data to backend. To restart the seeds, just empty the cache (data_seed) */
	async seed() {
		if (!this.teamId) return;
		const keyStorage = 'data_seeded:' + this.teamId;

		// this.listHelper.searchedItems$
		// 	.pipe(first())
		// 	.subscribe(async foundItems => {
		// 		if (!foundItems || !foundItems.length) {
		// 			await this.statusSeeder.createAllStatus();
		// 			localStorage.setItem(keyStorage, 'WorkFlowStatus');
		// 		}
		// 	});
	}
}
