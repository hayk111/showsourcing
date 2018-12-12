import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~core/models';
import { ProductService } from '~core/entity-services';

@Component({
	selector: 'app-selector-test',
	templateUrl: './selector-test.component.html',
	styleUrls: ['./selector-test.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorTestComponent implements OnInit {

	product$: Observable<Product>;

	constructor(private produdctSrv: ProductService) { }

	ngOnInit() {
		this.product$ = this.produdctSrv.selectOne('a097fe3d-6f84-4918-89e2-7a090728207c');
	}

}
