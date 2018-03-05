import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Product, selectProductsState } from '~products';
import { TargetAction } from '~store/action/target/target.action';
import { FilterGroupName } from '~shared/filters';
import { ERM, EntityState } from '~entity';

@Component({
	selector: 'workflow-page-app',
	templateUrl: './workflow-page.component.html',
	styleUrls: ['./workflow-page.component.scss'],
})
export class WorkflowPageComponent implements OnInit {
	filterGroupName = FilterGroupName.WORKFLOW_PAGE;
	repr = ERM.product;
	pending$: Observable<boolean>;
	previewDialogOpen = false;

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.pending$ = this.store.select(selectProductsState).pipe(map((p: EntityState<Product>) => p.pending));
	}

	onItemSelected(entityId: string) {
		this.previewDialogOpen = true;
		const target = { entityId, entityRepr: this.repr };
		this.store.dispatch(TargetAction.select(target));
	}

	closeDialog() {
		this.previewDialogOpen = false;
	}
}
