import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserHttpService {

	constructor(private http: HttpClient) { }


	load() {
		return this.http.get('api/user');
	}
}
