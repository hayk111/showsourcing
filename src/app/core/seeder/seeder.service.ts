import { Injectable } from '@angular/core';
import { TeamService } from '~core/auth';

@Injectable({
	providedIn: 'root',
})
export class SeederService {
	constructor(private teamSrv: TeamService) {}

	seed() {}
}
