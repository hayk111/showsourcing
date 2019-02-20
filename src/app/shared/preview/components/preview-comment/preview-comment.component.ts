import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommentService } from '~core/entity-services/comment/comment.service';
import { Comment } from '~models';

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
	@ViewChild('inp') input: ElementRef<HTMLInputElement>;

	// element is needed if we want to acces the position of the element to scroll (product preview)
	constructor(
		private commentSrv: CommentService,
		public element: ElementRef) { }

	addComment() {
		const comment = new Comment({ text: this.commentCtrl.value });
		this.commentSrv.create(comment);
		this.added.emit(comment);
		this.commentCtrl.reset();
	}

	focus() {
		this.element.nativeElement.scrollIntoView();
		this.input.nativeElement.focus();
	}

}
