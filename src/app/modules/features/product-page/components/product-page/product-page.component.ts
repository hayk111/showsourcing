import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { Product } from '../../../../store/model/entities/product.model';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { Observable } from 'rxjs/Observable';
import { selectProductById } from '../../../../store/selectors/entities/products.selector';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { TagActions } from '../../../../store/action/entities/tag.action';
import { Tag } from '../../../../store/model/entities/tag.model';
import { tap, take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { ProjectSlctnActions } from '../../../../store/action/selection/project-selection.action';
import { selectProjectsForSelection, selectProductSelected } from '../../../../store/selectors/selection/selection.selector';
import { SelectionAction } from '../../../../store/action/selection/selection.action';

@Component({
	selector: 'product-page-app',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	target: EntityTarget;
	files: Array<AppFile>;
	comments: Array<AppComment>;
	projectRep = entityRepresentationMap.projects;
	projects$: Observable<Array<string>>;


	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(takeUntil(this._destroy$))
		.subscribe(params => {
			const id = params['id'];
			this.target = { entityId: id, entityRepr: entityRepresentationMap.product };
			this.store.dispatch(SelectionAction.select(this.target));
		});
		this.product$ = this.store.select(selectProductSelected);
		this.projects$ = this.store.select(selectProjectsForSelection);
	}

	onProjectAdded(event) {
		this.store.dispatch(ProjectSlctnActions.add(event));
	}

	onProjectRemoved(event) {
		this.store.dispatch(ProjectSlctnActions.removeForSelection(event));
	}

}
