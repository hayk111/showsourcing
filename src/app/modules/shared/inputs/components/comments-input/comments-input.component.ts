import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppComment } from '../../../../store/model/comment.model';
import { Validators, FormControl } from '@angular/forms';
import { selectTeamMember } from '../../../../store/selectors/team-members.selector';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { takeUntil, take, map } from 'rxjs/operators';
import { User } from '../../../../store/model/user.model';


@Component({
	selector: 'comments-input-app',
	templateUrl: './comments-input.component.html',
	styleUrls: ['./comments-input.component.scss']
})
export class CommentsInputComponent extends AutoUnsub implements OnInit {
	@Input() comments: Array<AppComment>;
	@Output() newComment = new EventEmitter<string>();
	ctrl = new FormControl('', Validators.required);

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {}

	onEnter() {
		if (this.ctrl.valid)
			this.newComment.emit(this.ctrl.value);
		this.ctrl.setValue('');
	}

	getTeamMemberName(id: string) {
		return this.store.select(selectTeamMember(id)).pipe(
			takeUntil(this._destroy$),
			take(1),
			map((user: User) => `${user.firstName} ${user.lastName}`)
		);
	}

}
