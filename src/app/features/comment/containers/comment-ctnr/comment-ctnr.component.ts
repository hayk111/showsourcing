import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { EntityState, EntityTarget } from '~entity';
import { entityStateToArray } from '~entity/utils';
import { UserService } from '~app/features/user';
import { AppComment } from '~app/features/comment/store/comment/comment.model';
import { selectCommentArray, selectCommentPending } from '~app/features/comment/store';
import { CommentActions } from '~app/features/comment/store/comment';

@Component({
	selector: 'comment-ctnr-app',
	templateUrl: './comment-ctnr.component.html',
	styleUrls: ['./comment-ctnr.component.scss'],
})
export class CommentCtnrComponent implements OnInit {
	comments$: Observable<Array<AppComment>>;
	pending$: Observable<boolean>;
	ctrl = new FormControl('', Validators.required);

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.comments$ = this.store.select(selectCommentArray);
		this.pending$ = this.store.select(selectCommentPending);
	}

	onComment() {
		const comment = new AppComment(this.ctrl.value, this.userSrv.userId);
		this.store.dispatch(CommentActions.create(comment));
		this.ctrl.reset();
	}
}
