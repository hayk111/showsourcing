import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '~models';
import { RatingService } from '~shared/rating/services/thumbs.service';

@Component({
	selector: 'product-summary-app',
	templateUrl: './product-summary.component.html',
	styleUrls: ['./product-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSummaryComponent implements OnInit {

	@Input() product: Product;
	@Output() updateStatus = new EventEmitter<string>();

	constructor(private thumbSrv: RatingService) { }

	ngOnInit() { }

	score() {
		return this.thumbSrv.computeScore(this.product);
	}
}
