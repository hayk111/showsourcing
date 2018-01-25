import { Component, OnInit } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Observable } from 'rxjs/Observable';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { CommentActions } from '../../../../store/action/entities/comment.action';
import { selectComments } from '../../../../store/selectors/entities/comments.selector';
import { ProductActions } from '../../../../store/action/entities/product.action';

@Component({
	selector: 'app-product-activity-page',
	templateUrl: './product-activity-page.component.html',
	styleUrls: ['./product-activity-page.component.scss']
})
export class ProductActivityPageComponent extends AutoUnsub implements OnInit {
	comments$: Observable<Array<AppComment>>;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.route.parent.params.takeUntil(this._destroy$)
		.subscribe(params => {
			const target = { entityId: params['id'], entityRepr: entityRepresentationMap.product };
			this.store.dispatch(ProductActions.loadComments());
			this.comments$ = this.store.select(selectComments);
		});
	}
}
