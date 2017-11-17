import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { TasksLoaderService } from '../../services/tasks-loader.service';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
  selector: 'tasks-page-app',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	filters$: Observable<Filter> = new Observable();
	tasks$;
	tasks = [];

  constructor(private tasksLoader: TasksLoaderService) {
		super();
	}

  ngOnInit() {
		this.tasks$ = this.tasksLoader.tasks$;
		this.tasks$.takeUntil(this._destroy$)
			.subscribe(t => this.tasks = t);
  }

}
