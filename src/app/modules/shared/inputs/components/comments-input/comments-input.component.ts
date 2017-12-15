import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppComment } from '../../../../store/model/comment.model';
import { Validators, FormControl } from '@angular/forms';
import { selectTeamMember } from '../../../../store/selectors/team-members.selector';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { takeUntil, take, map } from 'rxjs/operators';
import { User } from '../../../../store/model/user.model';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { selectComments, selectCommentsForTarget } from '../../../../store/selectors/comments.selector';
import { Observable } from 'rxjs/Observable';
import { CommentActions } from '../../../../store/action/comment.action';


@Component({
	selector: 'comments-input-app',
	templateUrl: './comments-input.component.html',
	styleUrls: ['./comments-input.component.scss']
})
export class CommentsInputComponent extends AutoUnsub implements OnInit {
	private _target: EntityTarget;
	// @Input at the bottom
	comments$: Observable<Array<AppComment>>;
	ctrl = new FormControl('', Validators.required);

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.comments$ = this.store.select(selectCommentsForTarget(this._target));
	}

	onEnter() {
		if (this.ctrl.valid) {
			const text = this.ctrl.value;
			this.store.dispatch(CommentActions.addNew( { text, target: this.target }));
		}
		this.ctrl.setValue('');
	}

	getTeamMemberName(id: string) {
		return this.store.select(selectTeamMember(id)).pipe(
			takeUntil(this._destroy$),
			take(1),
			map((user: User) => `${user.firstName} ${user.lastName}`)
		);
	}


	@Input()
	set target( target: EntityTarget ) {
		this._target = target;
		this.store.dispatch(CommentActions.load(target));
	}

	get target() {
		return this._target;
	}

}
