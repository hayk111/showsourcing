import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { StatusSelectorService } from '~shared/status/services/status-selector.service';
import { SupplierStatus, ProductStatus, Supplier } from '~models';
import { Observable } from 'rxjs';

@Component({
	selector: 'status-selector-badge-app',
	templateUrl: './status-selector-badge.component.html',
	styleUrls: ['./status-selector-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [StatusSelectorService],
})
export class StatusSelectorBadgeComponent implements OnInit {
	@Input() status: SupplierStatus;
	@Input() type: 'supplier' | 'product';
	@Output() update = new EventEmitter<string>();
	choices$: Observable<SupplierStatus[] | ProductStatus[]>;
	panelVisible = false;

	constructor(private srv: StatusSelectorService) { }

	ngOnInit() {
		switch (this.type) {
			case 'supplier': this.choices$ = this.srv.getSupplierStatuses(); break;
			case 'product': this.choices$ = this.srv.getProductStatuses(); break;
			default: throw Error(`type ${this.type} not supported`);
		}
	}

	displayPanel() {
		this.panelVisible = true;
	}

	closePanel() {
		this.panelVisible = false;
	}

	selectStatus(id: string) {
		this.update.emit(id);
		this.closePanel();
	}

}
