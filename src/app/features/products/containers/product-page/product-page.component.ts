import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AppComment } from '~comment';
import { EntityTarget, ERM } from '~entity';
import { AppFile } from '~features/file';
import { Product } from '~products/models';
import { ProductActions } from '~products/store';
import { ProjectTargetActions } from '~store/action/target/project.action';
import { TargetAction } from '~store/action/target/target.action';
import { selectProjectsForCurrentTarget } from '~store/selectors/target/target.selector';
import { AutoUnsub } from '~utils';

import { selectProductById } from './../../store/product.selector';

@Component({
	selector: 'product-page-app',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	target: EntityTarget;
	files: Array<AppFile>;
	comments: Array<AppComment>;
	projectRep = ERM.projects;
	projects$: Observable<Array<string>>;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.route.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
			const id = params['id'];
			this.target = { entityId: id, entityRepr: ERM.product };
			this.store.dispatch(TargetAction.select(this.target));
			this.store.dispatch(ProductActions.loadById(id));
		});
		this.product$ = this.route.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.store.select(selectProductById(params.id)))
		);
		this.projects$ = this.store.select(selectProjectsForCurrentTarget);
	}

	onProjectAdded(event) {
		this.store.dispatch(ProjectTargetActions.add(event));
	}

	onProjectRemoved(event) {
		this.store.dispatch(ProjectTargetActions.remove(event));
	}
}
