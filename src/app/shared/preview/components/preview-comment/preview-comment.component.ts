import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Comment } from '~models';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'preview-comment-app',
	templateUrl: './preview-comment.component.html',
	styleUrls: ['./preview-comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2'
	}
})
export class PreviewCommentComponent {
	@Output() added = new EventEmitter<Comment>();
	commentCtrl = new FormControl();

	constructor(private commentSrv: CommentService) { }

	addComment() {
		const comment = new Comment({ text: this.commentCtrl.value });
		this.commentSrv.create(comment);
		this.added.emit(comment);
		this.commentCtrl.reset();
	}

}
