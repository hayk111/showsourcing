import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { ProductVote } from '~models';

@Component({
	selector: 'action-bar-app',
	templateUrl: './action-bar.component.html',
	styleUrls: ['./action-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.isVisible]': 'isVisible'
	}
})
export class ActionBarComponent implements OnInit {

	// when we need the action bar to be hidden and then displayed when an event occurs
	@Input() isVisible = true;
	@Input() favorite = false;
	@Input() votes: ProductVote[];
	@Input() buttonName: string;
	@Output() onFavorite = new EventEmitter<null>();
	@Output() onUnfavorite = new EventEmitter<null>();
	@Output() vote = new EventEmitter<any>();
	@Output() addToProject = new EventEmitter<null>();
	@Output() buttonClick = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
