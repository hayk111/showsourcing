import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/entities/user.selector';
import { User } from '../model/entities/user.model';

@Injectable()
export class SupplierService {

	load(id: string, maxCounter: number) {
			return this.http.get(`api/team/${id}/supplier?counter=${maxCounter}`).pipe(
				map((r: any) => r.elements)
			);
	}

	constructor(private http: HttpClient) {
	}

}
