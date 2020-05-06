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

	@Input() vote: Vote;
	@Input() nodeId: string;
	@Output() viewRatings = new EventEmitter<Vote[]>();
	@Output() update = new EventEmitter<Observable<Vote>>();

	constructor(private ratingSrv: RatingService) { }

	onStarVote(value: number) {
		this.update.emit(this.ratingSrv.starVote(this.vote, value, this.nodeId));
	}

}
