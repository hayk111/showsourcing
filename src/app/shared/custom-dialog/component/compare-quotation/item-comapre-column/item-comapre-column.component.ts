import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
@Component({
	selector: 'item-comapre-column-app',
	templateUrl: './item-comapre-column.component.html',
	styleUrls: ['./item-comapre-column.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCompareColumnComponent extends TrackingComponent implements OnInit {

  @Input() type: ('title' | 'content') = 'content';
  @Input() product: Product;

	constructor() {
		super();
	}

	ngOnInit() { }

}
