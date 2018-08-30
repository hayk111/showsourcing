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

}
