import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { CreationProductDlgComponent } from '~common/modals';

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageComponent implements OnInit {

	test = 'nop';

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
	}

	open() {
		this.dlgSrv.open(CreationProductDlgComponent);
	}
}
