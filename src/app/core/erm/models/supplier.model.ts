import { Entity } from '~core/erm/models/_entity.model';

import { Team } from './team.model';
import { CreateSupplierInput } from 'app/API.service';

export class Supplier extends Entity<CreateSupplierInput> {
	__typename = 'Supplier';
	team: Team;
	name: string;
	fullName?: string;
	tradingName?: string;

	constructor(config: CreateSupplierInput) {
		super(config);
	}
}
