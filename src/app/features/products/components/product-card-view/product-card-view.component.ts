import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Product, ProductStatusType } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardViewComponent extends ListViewComponent<Product> {
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();
	@Output() addToProject = new EventEmitter<string>();
	@Output() update = new EventEmitter<Product>();
	@Input() statuses: Array<ProductStatusType>;
	trackByFn = (index, item) => item.id;

}
