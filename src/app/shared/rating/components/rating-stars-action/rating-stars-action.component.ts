import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductVote } from '~core/models';
import { UserService } from '~core/entity-services';

@Component({
	selector: 'rating-stars-action-app',
	templateUrl: './rating-stars-action.component.html',
	styleUrls: ['./rating-stars-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsActionComponent implements OnInit {

	private _votes: ProductVote[];
	@Input() set votes(votes: ProductVote[]) {
		this._votes = votes;
		const voteIndex = (votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		if (~voteIndex)
			this.myVote = votes[voteIndex];
	}
	get votes() {
		return this._votes;
	}

	@Output() numVoted = new EventEmitter<number>();

	myVote: ProductVote;

	constructor(private userSrv: UserService) { }

	ngOnInit() {
	}

}
