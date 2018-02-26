import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PreloaderService {

	constructor(private http: HttpClient) {
	}

	loadMaxCounter(id) {
		return this.http.get(`api/team/${id}/maxCounter`);
	}
}
