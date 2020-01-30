import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product, ProductVote } from '~core/erm/models';
import { UserService } from '~core/erm/services/user/user.service';
import { RatingService } from '~shared/rating/services/rating.service';

@Component({
	selector: 'stats-icons-app',
	templateUrl: './stats-icons.component.html',
	styleUrls: ['./stats-icons.component.scss'],
	host: {
		'[class.spacing-ms]': 'fullInfo'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsIconsComponent implements OnInit {

	@Input() set product(product: Product) {
		this.name = 'thumbs-up';
		this.like = false;
		this.dislike = false;
		this.colorTxt = 'txt-secondary';
		if (product)
			this.userVote = (product.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
		if (this.userVote) {
			if (this.userVote.value === 100) {
				this.like = true;
				this.dislike = false;
				this.name = 'thumbs-up-background';
			} else {
				this.dislike = true;
				this.like = false;
				this.name = 'thumbs-down-background';
			}
		}
		this._product = product;
	}
	get product() {
		return this._product;
	}
	/** whether we display only the like icon or not*/
	@Input() onlyLike = false;
	@Input() favorite = false;
	/** if the % is displayed */
	@Input() hasPercent = true;
	/** whether we display the entire information or not */
	@Input() fullInfo = false;
	@Input() colorTxt = 'txt-secondary';

	name = 'thumbs-up';
	like = false;
	dislike = false;
	private _product: Product;
	userVote: ProductVote;

	constructor(
		private userSrv: UserService,
		private ratingSrv: RatingService) { }

	ngOnInit() {
	}

	score() {
		return this.ratingSrv.computeScore(this._product);
	}

	get successTxt() {
		let color = 'color-' + this.colorTxt;
		if (this.dislike && !this.fullInfo)
			color = 'color-warn';
		else if (this.like && !this.fullInfo)
			color = 'color-success';
		return {
			color: `var(--${color})`
		};
	}

	colorIcon() {
		let color = 'color-' + this.colorTxt;
		if (this.dislike)
			color = 'color-warn';
		else if (this.like)
			color = 'color-success';
		return color;
	}

}
