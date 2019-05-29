import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { MassEditDlgComponent } from '~common/modals';
import { ERM } from '~core/models';

@Component({
	selector: 'app-test-page',
	templateUrl: './test-page.component.html',
	styleUrls: ['./test-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPageComponent implements OnInit {

	constructor(private dlgSrv: DialogService) { }

	ngOnInit() {
	}

	test() {
		this.dlgSrv.open(MassEditDlgComponent, { type: ERM.PRODUCT });
	}

}
