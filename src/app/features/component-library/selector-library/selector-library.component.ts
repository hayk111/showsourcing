import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '~core/models';
import { ProductService } from '~core/entity-services';

@Component({
	selector: 'app-selector-library',
	templateUrl: './selector-library.component.html',
	styleUrls: ['./selector-library.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorLibraryComponent implements OnInit {

	product$: Observable<Product>;
	id = 'a097fe3d-6f84-4918-89e2-7a090728207c';

	constructor(private produdctSrv: ProductService) { }

	ngOnInit() {
		this.product$ = this.produdctSrv.selectOne(this.id);
	}

	update(item, prop) {
		this.produdctSrv.update({ id: this.id, [prop]: item }).subscribe();
	}

}
