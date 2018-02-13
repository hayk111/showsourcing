import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { AppComment } from '../../../../store/model/entities/comment.model';


@Component({
	selector: 'comments-app',
	templateUrl: './comments-input.component.html',
	styleUrls: ['./comments-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsInputComponent extends AutoUnsub {
	private _comments: Array<AppComment>;
	@Output() newComment = new EventEmitter<string>();
	ctrl = new FormControl('', Validators.required);

	constructor(private store: Store<any>) {
		super();
	}

	onEnter(txt: string) {
		this.newComment.emit(txt);
	}

	@Input()
	set comments(v: Array<AppComment>) {
		// Antoine wants the reverse order.
		this._comments = v.reverse();
	}

	get comments() {
		return this._comments;
	}

}
