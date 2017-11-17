import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeamItemLoaderService } from '../../../shared/filtered-list-page/services/team-item-loader.service';

@Injectable()
export class TasksLoaderService {
	tasks$: Observable<any>;
	
	constructor(private teamItemLoader: TeamItemLoaderService) {
		this.tasks$ = this.teamItemLoader.items$;
		this.teamItemLoader.init('tasks');
	}
	

}
