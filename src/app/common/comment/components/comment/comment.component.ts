import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserService } from '~core/entity-services';
import { Comment, User } from '~models';

@Component({
	selector: 'comment-app',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

	@Input() user: User;
	@Input() comment: Comment;

	isMine = false;

	constructor(private userSrv: UserService) { }

	ngOnInit() {
		this.isMine = this.userSrv.userSync.id === this.user.id;
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


}
