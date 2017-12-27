import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFirstProductEntityTarget } from '../../utils.utils';
import { switchMap } from 'rxjs/operators';
import { selectCommentsForTarget } from '../../../../store/selectors/comments.selector';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

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
			switchMap((target: EntityTarget) => this.store.select(selectCommentsForTarget(target)))
		).subscribe( comments => this.comments = comments);
	}

	onNewComment(text) {
		this.event = 'new comment added: ' + text;
	}

}
