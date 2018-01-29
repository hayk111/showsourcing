import { Component, OnInit } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { AppComment } from '../../../../store/model/entities/comment.model';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';
import { SelectionAction } from '../../../../store/action/selection/selection.action';
import { selectCommentsForSelection } from '../../../../store/selectors/selection/selection.selector';

@Component({
	selector: 'app-product-activity-page',
	templateUrl: './product-activity-page.component.html',
	styleUrls: ['./product-activity-page.component.scss']
})
export class ProductActivityPageComponent extends AutoUnsub implements OnInit {
	comments$: Observable<Array<AppComment>>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.comments$ = this.store.select(selectCommentsForSelection);
	}
}
