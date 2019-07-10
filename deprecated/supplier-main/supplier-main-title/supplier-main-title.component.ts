import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '~models';


@Component({
	selector: 'supplier-main-title-app',
	templateUrl: './supplier-main-title.component.html',
	styleUrls: ['./supplier-main-title.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMainTitleComponent {
	@Input() supplier: Supplier;

}
