import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CategoryService {

	constructor(private http: HttpClient) {
	}

	load(id: string, counter: number) {
		return this.http.get(`api/team/${id}/category?counter=${counter}`);
	}
}
