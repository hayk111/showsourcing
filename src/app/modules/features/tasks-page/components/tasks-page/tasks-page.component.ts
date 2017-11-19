import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { TeamItemLoaderService } from '../../../../shared/filtered-list-page/services/team-item-loader.service';


@Component({
  selector: 'tasks-page-app',
  templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ TeamItemLoaderService ]
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	filters$: Observable<Filter> = new Observable();
	tasks$;
	tasks = [];

  constructor(private itemLoader: TeamItemLoaderService) {
		super();
	}

  ngOnInit() {
		this.itemLoader.init('task');
		this.tasks$ = this.itemLoader.items$;
		this.tasks$.takeUntil(this._destroy$)
			.subscribe(t => this.tasks = t);
  }

}
