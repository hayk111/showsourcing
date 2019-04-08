import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SupplierRequest } from '~core/models';

@Component({
	selector: 'request-view-dlg-app',
	templateUrl: './request-view-dlg.component.html',
	styleUrls: ['./request-view-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestViewDlgComponent implements OnInit {

	@Input() request: SupplierRequest;

	constructor() { }

	ngOnInit() {
	}

}
