import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RatingService, TypeWithVotes, Vote } from '~shared/rating/services/rating.service';

@Component({
	selector: 'rating-dashboard-app',
	templateUrl: './rating-dashboard.component.html',
	styleUrls: ['./rating-dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingDashboardComponent {

	@Input() votes: Vote[];
	@Input() type: TypeWithVotes;
	@Output() viewRatings = new EventEmitter<Vote[]>();
	@Output() update = new EventEmitter<Vote[]>();

	constructor(private ratingSrv: RatingService) { }

	onStarVote(number: number) {
		this.update.emit(this.ratingSrv.starVote(this.votes, number, this.type));
	}

}
