import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~core/models';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'creation-product-dlg-app',
	templateUrl: './creation-product-dlg.component.html',
	styleUrls: ['./creation-product-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationProductDlgComponent implements OnInit {

	@Input() product: Product;

	// map with all the values needed

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
	}

}
