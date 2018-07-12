import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Supplier } from '~models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';


@Component({
	selector: 'supplier-preview-app',
	templateUrl: './supplier-preview.component.html',
	styleUrls: ['./supplier-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPreviewComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() close = new EventEmitter<undefined>();
	/** at first the supplier is the one in the list but it hasn't got all info so we gonna query it again */
	supplier$: Observable<Supplier>;

	constructor(private route: ActivatedRoute, private featureSrv: SupplierFeatureService) { }

	ngOnInit() {
		// getting the supplier with all the data
		this.supplier$ = this.featureSrv.selectOne(this.supplier.id);
	}

}
