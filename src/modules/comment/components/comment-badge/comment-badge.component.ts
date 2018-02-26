import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'comment-badge-app',
  templateUrl: './comment-badge.component.html',
	styleUrls: ['./comment-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentBadgeComponent implements OnInit {
	@Input() pending = true;
  constructor() { }

  ngOnInit() {
  }

}
