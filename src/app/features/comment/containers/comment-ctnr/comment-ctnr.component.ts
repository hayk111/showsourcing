import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { EntityState, AppComment, fromComment } from '~entity';
import { entityStateToArray } from '~entity/utils';
import { UserService } from '~app/features/user';

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
		const commentsState$ = this.store.select(fromComment.selectState);

		this.comments$ = commentsState$.pipe(
			map((commentState: EntityState<AppComment>) => entityStateToArray(commentState)),
			// we want it in reverse order
			map(comments => comments.reverse())
		);

		this.pending$ = commentsState$.pipe(map((comments: EntityState<AppComment>) => comments.pending));
	}

	onComment() {
		this.store.dispatch(fromComment.Actions.create(new AppComment(this.ctrl.value, this.userSrv.userId)));
		this.ctrl.reset();
	}
}
