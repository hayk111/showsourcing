import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ERM, Product } from '~models';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent implements OnInit {

	@Input() product: Product;

	erm = ERM;

	constructor() { }

	ngOnInit() {
	}

}
/**
 product details
 - hover effects have a minimum-width
 - when clicking on the title the rating, sample, task, comment -> you should be redirected
 - status button change on design
 - add the update methods to the sub-header

- sample/task/project list -> when hovering over list item, txt-btn class and open preview or open project
 - project list -> add button to add projects
 - product sub header -> supplier section -> name supplier and stars 2-4px margin
 - success color != task color, change it logo app
 - tags badge change color style
 - on rating badge , parenthesis shoudl not appear if ther eis no votes at all

 - Card with tables -> Titles on each table
		 - Sample reference align to left iwth name
 */