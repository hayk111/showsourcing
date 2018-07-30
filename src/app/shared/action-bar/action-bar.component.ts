import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'action-bar-app',
	templateUrl: './action-bar.component.html',
	styleUrls: ['./action-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionBarComponent implements OnInit {

	@Output() favorite = new EventEmitter<null>();
	@Output() unfavorite = new EventEmitter<null>();
	@Output() like = new EventEmitter<null>();
	@Output() dislike = new EventEmitter<null>();
	@Output() addToProject = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
