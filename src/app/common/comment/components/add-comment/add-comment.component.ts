import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '~core/entity-services';
import { User } from '~core/models';


@Component({
	selector: 'add-comment-app',
	templateUrl: './add-comment.component.html',
	styleUrls: ['./add-comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCommentComponent {
	commentCtrl = new FormControl('', Validators.required);
	user: User;
	@Output() added = new EventEmitter<string>();

	constructor(private userSrv: UserService) {
		this.user = this.userSrv.userSync;
	}

	addComment() {
		if (this.commentCtrl.valid) {
			this.added.emit(this.commentCtrl.value);
			this.commentCtrl.reset();
		}
	}
}
