import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductVote } from '~core/models';
import { RatingService } from '~shared/rating/services/rating.service';

@Component({
	selector: 'rating-dashboard-app',
	templateUrl: './rating-dashboard.component.html',
	styleUrls: ['./rating-dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingDashboardComponent {

	@Input() votes: ProductVote[];
	@Output() viewRatings = new EventEmitter<ProductVote[]>();
	@Output() update = new EventEmitter<ProductVote[]>();

	constructor(private ratingSrv: RatingService) { }

	onStarVote(number: number) {
		this.update.emit(this.ratingSrv.starVote(this.votes, number));
	}

}
