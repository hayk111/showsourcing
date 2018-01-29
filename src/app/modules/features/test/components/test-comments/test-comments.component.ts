import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getFirstProductEntityTarget } from '../../utils.utils';
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
	}

	onNewComment(text) {
		this.event = 'new comment added: ' + text;
	}

}
