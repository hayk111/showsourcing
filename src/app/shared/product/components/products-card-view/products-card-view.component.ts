import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ChangeDetectorRef,
} from '@angular/core';
import { Product, ProductStatusType } from '~models';
import { ListViewComponent } from '~shared/list-page/list-view.component';

@Component({
	selector: 'products-card-view-app',
	templateUrl: './products-card-view.component.html',
	styleUrls: ['./products-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCardViewComponent extends ListViewComponent<Product> {
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();
	@Output() addToProject = new EventEmitter<string>();
	@Output() update = new EventEmitter<Product>();
	@Input() statuses: Array<ProductStatusType>;
	trackByFn = (index, item) => item.id;


}
