import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AutoUnsub } from '~utils';
import { ChangeDetectionStrategy } from '@angular/core';
import { ProductVote } from '~models';
import { UserService } from '~global-services';
import { ProductVoteService } from '~global-services/product-vote/product-vote.service';
import { thumbAnimation } from './animation';

@Component({
	selector: 'thumb-buttons-app',
	templateUrl: './thumb-buttons.component.html',
	styleUrls: ['./thumb-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(mousedown)': 'onClick($event)'
	},
	animations: thumbAnimation
})
export class ThumbButtonsComponent extends AutoUnsub implements OnInit {
	@Output() vote = new EventEmitter<ProductVote[]>();
	/** whether we display two thumbs or just one */
	@Input() isSingle = true;
	/** list of all votes */
	@Input() set votes(votes: ProductVote[]) {
		this.userVote = (votes || []).find(v => v.user.id === this.userSrv.userSync.id);
		this._votes = votes;
	}
	get votes() {
		return this._votes;
	}
	@Input() size = 's';
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
				this.vote.emit([...this.votes, newVote]);
			});
		} else {
			this.userVote.value = this.userVote.value === 100 ? 0 : 100;
			this.vote.emit(this._votes);
		}
	}

	get state() {
		if (!this.userVote)
			return 'none';
		return this.userVote.value === 100 ? 'up' : 'down';
	}

}
