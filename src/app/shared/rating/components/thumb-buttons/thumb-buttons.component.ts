import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '~entity-services';
import { ProductVote } from '~models';

@Component({
	selector: 'thumb-buttons-app',
	templateUrl: './thumb-buttons.component.html',
	styleUrls: ['./thumb-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// animations: thumbAnimation,
})
export class ThumbButtonsComponent {

	@Input() size = 's';
	@Input() hasText = false;
	@Input() multiple = false;
	// when multiple is true we don't have to pass votes as a parameter
	@Input() set votes(votes: ProductVote[]) {
		this.like = false;
		this.dislike = false;
		if (!this.multiple) {
			const voteIndex = (votes || []).findIndex(v => v.user.id === this.userSrv.userSync.id);
			if (~voteIndex) {
				const vote = votes[voteIndex];
				vote.value === 100 ? this.like = true : this.like = false;
				vote.value === 0 ? this.dislike = true : this.dislike = false;
			}
		}
	}
	// we only use the boolean item inside the emitter when using multiple selection
	@Output() liked = new EventEmitter<boolean>();
	@Output() disliked = new EventEmitter<boolean>();
	like = false;
	dislike = false;

	constructor(private userSrv: UserService) { }

	thumbUp() {
		if (this.multiple) { // we do this on multiple since its the only way to know the current state of the thumbs
			this.like = this.like ? false : true;
			this.dislike = false;
		}
		this.liked.emit(this.like);
	}

	thumbDown() {
		if (this.multiple) {
			this.dislike = this.dislike ? false : true;
			this.like = false;
		}
		this.disliked.emit(this.dislike);
	}
}
