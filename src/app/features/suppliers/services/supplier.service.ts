import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EntityService, ERM, Patch } from '~entity';
import { UserService } from '~user';

@Injectable()
export class SupplierService {
	constructor(private http: HttpClient, private entitySrv: EntityService, private userSrv: UserService) {}

	load() {
		return this.entitySrv
			.load({ base: ERM.teams, target: ERM.suppliers, recurring: true })
			.pipe(map((r: any) => r.elements));
	}

	loadById(id: string) {
		return this.http.get(`api/supplier/${id}`);
	}

	create(supplier) {
		return this.http.post(`api/team/${this.userSrv.teamId}/supplier`, supplier);
	}

	sendPatchRequest(p: Patch) {
		const patch = {
			[p.propName]: p.value,
		};
		return this.http.patch(`api/supplier/${p.id}`, patch);
	}
}
