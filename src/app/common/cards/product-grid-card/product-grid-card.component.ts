import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { Product } from '~core/erm3/models';
import { RatingService } from '~shared/rating/services/rating.service';
import { StatusUtils } from '~utils';
import { ListPageViewService } from '~core/list-page2/list-page-view.service';
import { SelectionService } from '~core/list-page2';
import { api, Project } from 'showsourcing-api-lib';

@Component({
	selector: 'product-grid-card-app',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.small-card]': 'size === "s"',
	},
})
export class ProductGridCardComponent {
	@Input() size: 's' | 'm' = 'm';
	@Input() product: Product;
	@Input() selected: boolean;
	@Input() hasCheckbox = true;
	@Input() hasHoverEffect = true;
	@Output() open = new EventEmitter<null>();
	@Output() preview = new EventEmitter<null>();
	@Output() select = new EventEmitter<null>();
	@Output() unselect = new EventEmitter<null>();
	@Output() update = new EventEmitter<Product>();

	statusUtils = StatusUtils;

	constructor(
		public ratingSrv: RatingService,
		public viewSrv: ListPageViewService<Product>,
		public selectionSrv: SelectionService
	) {}

	updateProductProjects(projects: Project[]) {
		const toPass = [];

		projects.forEach(project => {
 			toPass.push({
				project: project.id,
				product: this.product.id
			});
		});

		api.ProjectProduct.create(toPass);
	}

	thumbUp() {
		// const votes = this.ratingSrv.thumbUp(this.product, EntityName.PRODUCT);
		// this.update.emit({ id: this.product.id, votes });
	}

	thumbDown() {
		// const votes = this.ratingSrv.thumbDown(this.product, EntityName.PRODUCT);
		// this.update.emit({ id: this.product.id, votes });
	}
}
