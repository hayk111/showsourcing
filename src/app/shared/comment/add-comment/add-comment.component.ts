import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
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

	@ViewChild('inp', { static: true }) input: ElementRef<HTMLInputElement>;

	constructor(
		private userSrv: UserService,
		public element: ElementRef
	) {
		this.user = this.userSrv.userSync;
	}

	addComment() {
		if (this.commentCtrl.valid) {
			this.added.emit(this.commentCtrl.value);
			this.commentCtrl.reset();
		}
	}

	focus() {
		this.element.nativeElement.scrollIntoView({ behavior: 'smooth' });
		this.input.nativeElement.focus();
	}
}
