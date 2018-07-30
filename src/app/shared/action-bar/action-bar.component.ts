import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';

@Component({
	selector: 'action-bar-app',
	templateUrl: './action-bar.component.html',
	styleUrls: ['./action-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent implements OnInit {

	@Input() favorite = false;
	@Input() like = false;
	@Input() dislike = false;
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() onLike = new EventEmitter<boolean>();
	@Output() onDislike = new EventEmitter<boolean>();
	@Output() addToProject = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
