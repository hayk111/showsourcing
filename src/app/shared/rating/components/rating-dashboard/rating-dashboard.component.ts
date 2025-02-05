import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductVote } from '~core/models';
import { ThumbService } from '~shared/rating/services/thumbs.service';

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

	constructor(private ratingSrv: ThumbService) { }

	onStarVote(number: number) {
		this.update.emit(this.ratingSrv.starVote(this.votes, number));
	}

}
