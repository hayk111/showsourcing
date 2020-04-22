import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { UserService } from '~core/auth';
import { ApiService, Comment } from '~core/erm3';

@Component({
	selector: 'comment-app',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

	@Input() comment: Comment;

	// if we don't have this viewChild, we cannot send the height of the item, since the HTML doesn't know
	// what does it have to read
	@ViewChild('text', { static: false, read: ElementRef }) text: ElementRef;

	/** if the comment belings to the current user or not */
	isMine = false;
	/** if we are currently editing the comment */
	isEditing = false;
	currentHeight = 0;
	/** minimum height to display */
	minHeight = 46;

	constructor(
		private apiSrv: ApiService,
		private dlgCommonSrv: DialogCommonService,
		private userSrv: UserService
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

	enableEdit(height: number) {
		this.isEditing = true;
		this.currentHeight = height + 26; // +26 is for the padding inside the textarea
	}

	onSave(text: string) {
		if (text)
			this.apiSrv.update('Comment', { id: this.comment.id, text }).subscribe();
		this.isEditing = false;
	}

	onDelete() {
		const text = `Are you sure you want to delete this comment ?`;
		this.dlgCommonSrv.openConfirmDlg({ text }).data$
			.pipe(
				switchMap(_ => this.apiSrv.delete('Comment', { id: this.comment.id }))
			).subscribe();
	}

}
