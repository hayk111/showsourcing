import { Injectable } from '@angular/core';
import { TeamService } from '~core/auth';
import { StatusSeederService } from './status-seeder.service';

@Injectable({
	providedIn: 'root',
})
export class SeederService {

	teamId: string;

	constructor(private teamSrv: TeamService, private statusSeeder: StatusSeederService) {
		this.teamSrv.teamSelected$.subscribe(team => {
			this.teamId = team.id;
		});
	}

	/* create data to backend. To restart the seeds, just empty the cache (data_seed) */
	async seed() {
		if (!this.teamId) return;
		const keyStorage = 'data_seeded:' + this.teamId;
		const isSeeded = localStorage.getItem(keyStorage);
		if (isSeeded) return;

		// await this.statusSeeder.deleteAllStatuses(); // not working backend side
		await this.statusSeeder.createAllStatus();

		localStorage.setItem(keyStorage, 'WorkFlowStatus');
	}
}
