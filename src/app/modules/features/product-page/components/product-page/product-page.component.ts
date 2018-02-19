import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/action/entities/index';
import { Product } from '../../../../store/model/entities/product.model';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { Observable } from 'rxjs/Observable';
import { selectProductById } from '../../../../store/selectors/entities/products.selector';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { TagActions } from '../../../../store/action/entities/index';
import { Tag } from '../../../../store/model/entities/tag.model';
import { tap, take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { ProjectTargetActions } from '../../../../store/action/target/project.action';
import { selectProjectsForCurrentTarget, selectProductSelected } from '../../../../store/selectors/target/target.selector';
import { TargetAction } from '../../../../store/action/target/target.action';

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
			this.store.dispatch(TargetAction.select(this.target));
		});
		this.product$ = this.store.select(selectProductSelected);
		this.projects$ = this.store.select(selectProjectsForCurrentTarget);
	}

	onProjectAdded(event) {
		this.store.dispatch(ProjectTargetActions.add(event));
	}

	onProjectRemoved(event) {
		this.store.dispatch(ProjectTargetActions.remove(event));
	}

}
