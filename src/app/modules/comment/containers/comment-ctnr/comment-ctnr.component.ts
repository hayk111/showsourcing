import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppComment } from '~comment';
import { Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCommentsArrayForCurrentTarget, selectCommentsForCurrentTarget } from '~store/selectors/target/target.selector';
import { CommentTargetActions } from '~comment';
import { UserService } from '~user';
import { map, tap } from 'rxjs/operators';
import { EntityState, entityStateToArray } from '~store/utils/entities.utils';

@Component({
  selector: 'comment-ctnr-app',
  templateUrl: './comment-ctnr.component.html',
  styleUrls: ['./comment-ctnr.component.scss']
})
export class CommentCtnrComponent implements OnInit {
	comments$: Observable<Array<AppComment>>;
	pending$: Observable<boolean>;
	ctrl = new FormControl('', Validators.required);

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		const commentsState$ = this.store.select(selectCommentsForCurrentTarget)

		this.comments$ = commentsState$.pipe(
			map((commentState: EntityState<AppComment>) => entityStateToArray(commentState)),
			// we want it in reverse order
			map(comments => comments.reverse())
		);

		this.pending$ = commentsState$.pipe(map((comments: EntityState<AppComment>) => comments.pending));
	}

	onComment(txt: string) {
		this.store.dispatch(CommentTargetActions.add(new AppComment(txt, this.userSrv.getUserId())));
	}

}
