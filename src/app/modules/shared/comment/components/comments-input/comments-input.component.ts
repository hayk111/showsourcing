import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntil, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { AppComment } from '../../../../store/model/comment.model';
import { selectCommentsForTarget } from '../../../../store/selectors/comments.selector';
import { CommentActions } from '../../../../store/action/comment.action';
import { selectTeamMember } from '../../../../store/selectors/team-members.selector';
import { User } from '../../../../store/model/user.model';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';


@Component({
	selector: 'comments-app',
	templateUrl: './comments-input.component.html',
	styleUrls: ['./comments-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsInputComponent extends AutoUnsub {
	@Input() comments: Array<AppComment> = [];
	@Output() newComment = new EventEmitter<string>();
	ctrl = new FormControl('', Validators.required);

	constructor(private store: Store<any>) {
		super();
	}

	onEnter(event) {
		if (this.ctrl.valid) {
			const text = this.ctrl.value;
			this.newComment.emit(text);
			this.ctrl.setValue('');
			event.preventDefault();
		}
	}

}
