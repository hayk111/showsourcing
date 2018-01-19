import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/action/product.action';
import { Product } from '../../../../store/model/product.model';
import { AppFile } from '../../../../store/model/app-file.model';
import { AppComment } from '../../../../store/model/comment.model';
import { Observable } from 'rxjs/Observable';
import { selectProductById } from '../../../../store/selectors/products.selector';
import { EntityTarget, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { TagActions } from '../../../../store/action/tag.action';
import { Tag } from '../../../../store/model/tag.model';
import { tap, take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { TargetTagActions } from '../../../../store/action/target/tag.action';
import { selectProjectsForTarget } from '../../../../store/selectors/target/project.selector';
import { TargetProjectActions } from '../../../../store/action/target/project.action';

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
			this.store.dispatch(ProductActions.loadOne(id));
			this.store.dispatch(TargetProjectActions.load(this.target));
			this.product$ = this.store.select(selectProductById(id));
			this.projects$ = this.store.select(selectProjectsForTarget);
		});
	}

	onProjectAdded(event) {
		this.store.dispatch(TargetProjectActions.add(event, this.target));
	}

	onProjectRemoved(event) {
		this.store.dispatch(TargetProjectActions.remove(event, this.target));
	}

}
