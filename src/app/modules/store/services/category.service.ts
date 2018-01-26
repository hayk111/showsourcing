import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../selectors/entities/user.selector';
import { User } from '../model/entities/user.model';


@Injectable()
export class CategoryService {

	constructor(private http: HttpClient) {
	}

	load(id: string, counter: number) {
		return this.http.get(`api/team/${id}/category?counter=${counter}`);
	}
}
