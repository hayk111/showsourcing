import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AppComment } from '~entity';

@Component({
	selector: 'comment-list-app',
	templateUrl: './comment-list.component.html',
	styleUrls: ['./comment-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {
	@Input() comments: Array<AppComment> = [];
	@Input() pending: boolean = true;

}
