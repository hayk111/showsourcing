import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'comment-list-app',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
