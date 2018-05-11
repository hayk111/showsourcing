import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {

	constructor() { }

	createTask(): Observable<any> {
		throw Error('not implemented yet');
	}

	editTask(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeTask(): Observable<any> {
		throw Error('not implemented yet');
	}
}
