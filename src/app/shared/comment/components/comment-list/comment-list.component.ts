import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { Comment } from '~models';

@Component({
	selector: 'comment-list-app',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {

	@Input() comments: Comment[];
	indexShow = 0;

	constructor() { }

	ngOnInit() {
		if (this.comments && this.comments.length > 0)
			this.showMore();
	}

	showMore() {
		this.indexShow += 2;
	}

}
