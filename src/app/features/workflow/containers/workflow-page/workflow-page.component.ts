import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityState, ERM } from '~app/entity';
import { Product } from '~models';


@Component({
	selector: 'workflow-page-app',
	templateUrl: './workflow-page.component.html',
	styleUrls: ['./workflow-page.component.scss'],
})
export class WorkflowPageComponent implements OnInit {
	repr = ERM.product;
	pending$: Observable<boolean>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		// this.pending$ = this.store.select(selectProductsState).pipe(map((p: EntityState<Product>) => p.pending));
	}

	onItemSelected(entityId: string) {

	}

}
