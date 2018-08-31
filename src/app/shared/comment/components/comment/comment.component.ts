import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { User, Comment } from '~models';

@Component({
	selector: 'comment-app',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

	@Input() user: User;
	@Input() comment: Comment;

	constructor() { }

	ngOnInit() {
	}

	urlify(text) {
		const urlRegex = /((http|https):\/\/|www.)[^\s]*/g;
		const trimRegex = /(((http|https):\/\/www\.)|(http|https):\/\/|www\.)/g;
		return text.replace(urlRegex, url => {
			// we add the '//' so it does not try to acces a relative path
			// if it has https we don't need the double bars
			const href = url.startsWith('http') ? url : '//' + url;
			return '<a href="' + href + '" class="color-primary">' + url.replace(trimRegex, '') + '</a>';
		});
	}


}
