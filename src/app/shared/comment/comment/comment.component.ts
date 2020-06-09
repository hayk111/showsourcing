import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { UserService } from '~core/auth';
import { Comment } from '~core/erm3';
import { ApiLibService } from '~core/api-lib';

@Component({
	selector: 'comment-app',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

	@Input() comment: Comment;
	@Output() deleted = new EventEmitter<Comment>();
	/** if the comment belings to the current user or not */
	isMine = false;
	/** if we are currently editing the comment */
	isEditing = false;

	constructor(
		private apiLibSrv: ApiLibService,
		private dlgCommonSrv: DialogCommonService,
		private userSrv: UserService,
	) { }

	ngOnInit() {
		this.isMine = this.userSrv.user.id === this.comment.createdBy.id;
	}

	urlify(text) {
		const urlRegex = /((http|https):\/\/|www\.|web\.)[^\s]*/g;
		const trimRegex = /(((http|https):\/\/www\.)|((http|https):\/\/web\.)|(http|https):\/\/|www\.|web\.)/g;
		return text.replace(urlRegex, url => {
			// we add the '//' so it does not try to acces a relative path
			// if it has https we don't need the double bars
			const href = url.startsWith('http') ? url : '//' + url;
			return '<a href="' + href + '" class="color-primary">' + url.replace(trimRegex, '') + '</a>';
		});
	}

	enableEdit() {
		this.isEditing = true;
	}

	onSave(message: string) {
		if (message) {
			this.apiLibSrv.db.update('Comment', [{ id: this.comment.id, message } as any]).subscribe();
		}
		this.isEditing = false;
	}

	onDelete() {
		const text = `Are you sure you want to delete this comment ?`;
		this.dlgCommonSrv.openConfirmDlg({ text }).data$
			.pipe(
				tap(_ => this.deleted.emit(this.comment)),
				switchMap(_ => this.apiLibSrv.db.delete('Comment', [{ id: this.comment.id }]))
			).subscribe();
	}

}
