import { Component, OnInit, Input } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { entityRepresentationMap, EntityState } from '../../../../store/utils/entities.utils';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { selectProducts } from '../../../../store/selectors/entities/products.selector';
import { map } from 'rxjs/operators';
import { Product } from '../../../../store/model/entities/product.model';
import { SelectionAction } from '../../../../store/action/selection/selection.action';

@Component({
  selector: 'workflow-page-app',
  templateUrl: './workflow-page.component.html',
  styleUrls: ['./workflow-page.component.scss']
})
export class WorkflowPageComponent implements OnInit{
	filterGroupName = FilterGroupName.WORKFLOW_PAGE;
	repr = entityRepresentationMap.product;
	pending$: Observable<boolean>;
	previewDialogOpen = false;

	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.pending$ = this.store.select(selectProducts).pipe(map((p: EntityState<Product>) => p.pending));
	}


	onItemSelected(entityId: string) {
		this.previewDialogOpen = true;
		const target = { entityId, entityRepr: this.repr };
		this.store.dispatch(SelectionAction.select(target));
	}

	closeDialog() {
		this.previewDialogOpen = false;
	}

}
