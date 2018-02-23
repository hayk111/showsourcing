import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AppComment } from '../../models';

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
