import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ERM, Product, Project, Sample, Task, ProductVote } from '~core/models';
import { ThumbService } from '~shared/rating/services/thumbs.service';

@Component({
	selector: 'product-docket-app',
	templateUrl: './product-docket.component.html',
	styleUrls: ['./product-docket.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDocketComponent {
	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();
	@Output() addTask = new EventEmitter<undefined>();
	@Output() addSample = new EventEmitter<undefined>();
	@Output() previewTask = new EventEmitter<Task>();
	@Output() previewSample = new EventEmitter<Sample>();
	@Output() openProject = new EventEmitter<Project>();
	@Output() openVotes = new EventEmitter<ProductVote[]>();

	@ViewChild('rating', { read: ElementRef, static: true }) rating: ElementRef;

	erm = ERM;
	constructor(private ratingSrv: ThumbService) { }

	onStarVote(number: number) {
		this.update.emit({ id: this.product.id, votes: this.ratingSrv.starVote(this.product.votes, number) });
	}

}
