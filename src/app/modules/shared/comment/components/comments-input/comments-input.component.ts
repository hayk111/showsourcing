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
