import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/user.selector';
import { User } from '../model/user.model';


@Injectable()
export class CategoryService {

	constructor(private http: HttpClient) {
	}

	load(id: string, counter: number) {
		return this.http.get(`api/team/${id}/category?counter=${counter}`);
	}
}
