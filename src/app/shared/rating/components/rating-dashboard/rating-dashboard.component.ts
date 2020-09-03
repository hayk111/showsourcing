import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingService } from '~shared/rating/services/rating.service';
import { Vote } from '~core/erm3/models';

@Component({
	selector: 'rating-dashboard-app',
	templateUrl: './rating-dashboard.component.html',
	styleUrls: ['./rating-dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingDashboardComponent {

	@Input() teamVotes: Vote[];
	@Input() userVote: Vote;
	@Input() nodeId: string;

	@Output() viewRatings = new EventEmitter<Vote[]>();
	@Output() update = new EventEmitter<number>();

	constructor(private ratingSrv: RatingService) { }

	onStarVote(value: number) {
		if (!this.userVote || value !== this.userVote.rating) {
			this.update.emit(value);
		}
	}

}
