import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppComment } from '~comment/store/comment/comment.model';

@Component({
	selector: 'comment-app',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {
	@Input() comment: AppComment;
	constructor() { }

	ngOnInit() {
	}

}
