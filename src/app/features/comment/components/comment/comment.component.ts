import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppComment } from '~comment';

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
