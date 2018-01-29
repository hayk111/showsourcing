import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFirstProductEntityTarget } from '../../utils.utils';
import { switchMap, tap } from 'rxjs/operators';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { CommentActions } from '../../../../store/action/entities/comment.action';
import { selectCommentsForTarget } from '../../../../store/selectors/target/comments.selector';

@Component({
	selector: 'app-test-comments',
	templateUrl: './test-comments.component.html',
	styleUrls: ['./test-comments.component.scss']
})
export class TestCommentsComponent extends AutoUnsub implements OnInit {
	comments = [];
	event;
	target$;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.target$ = getFirstProductEntityTarget(this.store, this._destroy$);
		this.target$.pipe(
			tap((target: EntityTarget) => this.store.dispatch(CommentActions.load(target))),
			switchMap((target: EntityTarget) => this.store.select(selectCommentsForTarget(target))),
		).subscribe( comments => this.comments = comments);
	}

	onNewComment(text) {
		this.event = 'new comment added: ' + text;
	}

}
