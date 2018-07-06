import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AutoUnsub } from '~utils/index';
import { ChangeDetectionStrategy } from '@angular/core';
import { ProductVote } from '~models';
import { UserService } from '~global-services';
import { ProductVoteService } from '~global-services/product-vote/product-vote.service';

@Component({
	selector: 'thumb-buttons-app',
	templateUrl: './thumb-buttons.component.html',
	styleUrls: ['./thumb-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(mousedown)': 'onClick($event)'
	}
})
export class ThumbButtonsComponent extends AutoUnsub implements OnInit {
	@Output() vote = new EventEmitter<ProductVote[]>();
	/** list of all votes */
	@Input() set votes(votes: ProductVote[]) {
		this.userVote = votes.find(v => v.user.id === this.userSrv.userSync.id);
		this._votes = votes;
	}
	private _votes: ProductVote[];

	userVote: ProductVote;
	constructor(
		private userSrv: UserService,
		private voteSrv: ProductVoteService) {
		super();
	}

	ngOnInit() {
	}

	onClick() {
		if (!this.userVote) {
			const vote = new ProductVote({
				value: 100,
				user: { id: this.userSrv.userSync.id }
			});
			this.voteSrv.create(vote).subscribe(newVote => {
				this.vote.emit(newVote);
			});
		} else {
			this.userVote.value = this.userVote.value === 100 ? 0 : 100;
			this.vote.emit(this.votes);
		}
	}

	get orientation() {
		// when no vote orientation is up
		if (!this.userVote)
			return 'up';
		return this.userVote.value === 100 ? 'up' : 'down';
	}

	get colorClass() {
		if (!this.userVote)
			return;
		if (this.userVote.value === 100)
			return 'color-primary';
		return 'color-warn';
	}

}
