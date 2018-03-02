import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectProductFocused } from '~products/store/selectors';
import { Store } from '@ngrx/store';
import { Product } from '~products';
import { ProjectTargetActions } from '~store/action/target/project.action';
import { TargetAction } from '~store/action/target/target.action';
import { AppFile } from '~features/file';
import { AppComment } from '~comment';
import { selectProjectsForCurrentTarget } from '~store/selectors/target/target.selector';
import { ERM, EntityTarget } from '~entity';
import { AutoUnsub } from '~utils';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';

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
		});
		this.product$ = this.store.select(selectProductFocused);
		this.projects$ = this.store.select(selectProjectsForCurrentTarget);
	}

	onProjectAdded(event) {
		this.store.dispatch(ProjectTargetActions.add(event));
	}

	onProjectRemoved(event) {
		this.store.dispatch(ProjectTargetActions.remove(event));
	}
}
