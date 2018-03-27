import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Product, selectProductsState } from '~entity';
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

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.pending$ = this.store.select(selectProductsState).pipe(map((p: EntityState<Product>) => p.pending));
	}

	onItemSelected(entityId: string) {

	}

	closeDialog() {
		this.previewDialogOpen = false;
	}
}
