import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'tasks-page-app',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	filters$: Observable<Filter> = new Observable();
  constructor() { }

  ngOnInit() {
  }

}
