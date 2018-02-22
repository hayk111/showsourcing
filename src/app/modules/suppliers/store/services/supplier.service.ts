import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from '../../../shared/user/services/user.service';

@Injectable()
export class SupplierService {

	constructor(private http: HttpClient, private userSrv: UserService) {}

	load(id: string, maxCounter: number) {
		return this.http.get(`api/team/${id}/supplier?counter=${maxCounter}`).pipe(
			map((r: any) => r.elements)
		);
	}

	loadById(id: string) {
		return this.http.get(`api/supplier/${id}`);
	}

	create(supplier) {
		return this.http.post(`api/team/${this.userSrv.user.currentTeamId}/supplier`, supplier);
	}

}
