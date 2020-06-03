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
import { UserService } from '~core/auth';
import { IconComponent } from '~shared/icons';
import { Vote } from '~core/erm3/models';

@Component({
	selector: 'rating-stars-action-app',
	templateUrl: './rating-stars-action.component.html',
	styleUrls: ['./rating-stars-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingStarsActionComponent implements AfterViewInit {

	private _userVote: Vote;
	@Input() set userVote(vote: Vote) {
		this._userVote = vote;

		if (vote) {
			this.sliceIndexStar = this.stars.filter(starValue => starValue <= vote.rating).length;
			this.changeStarsColor(this.sliceIndexStar);
		} else if (vote === null) {
			this.changeStarsColor(0);
		}
	}
	get userVote() {
		return this._userVote;
	}

	@Output() valueVoted = new EventEmitter<number>();

	@ViewChildren(IconComponent, { read: ElementRef }) iconStars: QueryList<ElementRef>;

	myVote: Vote;
	// array containing each value of a star
	stars = Array.from({ length: 5 }, (x, i) => (i + 1));
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

	onValueVoted(value) {
		if (this._userVote && value === this._userVote.rating) {
			return;
		}
		const vote = Object.assign({}, this._userVote);
		vote.rating = value;
		this.userVote = vote;
		this.valueVoted.emit(value);
	}

}
