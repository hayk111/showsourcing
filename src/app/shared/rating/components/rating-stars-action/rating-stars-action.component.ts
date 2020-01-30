import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	QueryList,
	Renderer2,
	ViewChildren,
} from '@angular/core';
import { UserService } from '~core/orm/services';
import { IconComponent } from '~shared/icons';
import { Vote } from '~shared/rating/services/rating.service';

@Component({
	selector: 'rating-stars-action-app',
	templateUrl: './rating-stars-action.component.html',
	styleUrls: ['./rating-stars-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsActionComponent implements AfterViewInit {

	private _votes: Vote[];
	@Input() set votes(votes: Vote[]) {
		this._votes = votes;
		const voteIndex = (votes || []).findIndex(v => v.user && v.user.id === this.userSrv.userSync.id);
		if (~voteIndex) {
			const myVote = votes[voteIndex];
			// we filter the array to get only the values LEQ than the value of the vote
			// e.g vote.value == 40 -> then the array would be [20, 40]
			// making the index for the slice 2 (the lenght of the array)
			this.sliceIndexStar = this.stars.filter(starValue => starValue <= myVote.value).length;
			// adds initial color to stars
			this.changeStarsColor(this.sliceIndexStar);
		}
	}
	get votes() {
		return this._votes;
	}

	@Output() valueVoted = new EventEmitter<number>();

	@ViewChildren(IconComponent, { read: ElementRef }) iconStars: QueryList<ElementRef>;

	myVote: Vote;
	// array containing each value of a star
	stars = Array.from({ length: 5 }, (x, i) => ((i + 1) * 20));
	// NOTE: this is not a normal index, is an slice index, Array.slice
	/** indicates where we have to slice the array to fill with color the stars */
	sliceIndexStar = 0;

	constructor(
		private userSrv: UserService,
		private renderer: Renderer2) { }

	ngAfterViewInit() {
		// adds initial color to stars
		this.changeStarsColor(this.sliceIndexStar);
	}

	// this can be done by css with the preperty (~), the only issue is that looks wanky
	/** changes color style of the icon-app component, when slicing it will
	 * fill color of stars if they are on the first part of the slice
	 * empty color of stars if they are on the second part of the slice
	 * @sliceIndex index that will be used to slice array
	 */
	changeStarsColor(sliceIndex: number) {
		if (this.iconStars) {
			const fillStars = this.iconStars.toArray().slice(0, sliceIndex);
			const emptyStars = this.iconStars.toArray().slice(sliceIndex);
			fillStars.forEach((star) => {
				this.renderer.setStyle(star.nativeElement, 'color', 'var(--color-accent)');
			});
			emptyStars.forEach((star) => {
				this.renderer.setStyle(star.nativeElement, 'color', 'var(--color-secondary)');
			});
		}
	}

}
