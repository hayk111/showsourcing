import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class IncoTermsService {
	constructor(private http: HttpClient) {}

	load() {
		return (
			this.http
				.get(`api/incoTerm`)
				// adding id so it's an entity
				.pipe(map((r: Array<any>) => r.map(id => ({ id, name: id }))))
		);
	}
}
