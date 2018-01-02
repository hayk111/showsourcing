import { Component, OnInit } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Task } from '../../../../store/model/task.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { ProductActions } from '../../../../store/action/product.action';
import { TaskActions } from '../../../../store/action/task.action';
import { selectTasks } from '../../../../store/selectors/tasks.selector';

@Component({
	selector: 'app-product-tasks',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss']
})
export class ProductTasksComponent extends AutoUnsub implements OnInit {

	tasks$: Observable<Array<Task>>;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.route.parent.params.takeUntil(this._destroy$)
		.subscribe(params => {
			const target = { entityId: params['id'], entityRepr: entityRepresentationMap.product };
			this.store.dispatch(ProductActions.loadTasks(params['id']));
			this.tasks$ = this.store.select(selectTasks);
		});
	}
}
