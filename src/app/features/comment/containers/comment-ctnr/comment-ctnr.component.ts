import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../../../global-services';
import { AppComment } from '~models';

@Component({
	selector: 'comment-ctnr-app',
	templateUrl: './comment-ctnr.component.html',
	styleUrls: ['./comment-ctnr.component.scss'],
})
export class CommentCtnrComponent implements OnInit {
	comments$: Observable<Array<AppComment>>;
	pending$: Observable<boolean>;
	ctrl = new FormControl('', Validators.required);

	constructor(private userSrv: UserService) { }

	ngOnInit() {
		// this.comments$ = this.store.select(selectCommentArray);
		// this.pending$ = this.store.select(selectCommentPending);
	}

	onComment() {
		// const comment = new AppComment(this.ctrl.value, this.userSrv.userId);
		// this.store.dispatch(CommentActions.create(comment));
		this.ctrl.reset();
	}
}
