import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { tap, take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../../../store/model/entities/product.model';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { selectProductById } from '../../../../store/selectors/entities/products.selector';
import { selectProjectsForTarget } from '../../../../store/selectors/entities/project.selector';
import { ProductActions } from '../../../../store/action/entities/product.action';

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
			this.product$ = this.store.select(selectProductById(id));
		});
	}

	onProjectAdded(event) {
		this.store.dispatch(ProductActions.addProjects([event], this.target));
	}

	onProjectRemoved(event) {
		this.store.dispatch(ProductActions.removeProject(event, this.target));
	}

}
