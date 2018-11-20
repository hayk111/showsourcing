import { Component, NgModuleRef } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { RefuseDialogComponent } from '../refuse/refuse-dialog.component';


@Component({
	selector: 'rfq-new-request-page-app',
	templateUrl: './new-request-page.component.html',
	styleUrls: ['./new-request-page.component.scss'],
})
export class NewRequestPageComponent {

	product = {
		'images': [
			{
				'id': '27bb4e6a-4830-4f6b-90fc-b6c77cabb953',
				'fileName': '27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg',
				'orientation': 0,
				'__typename': 'Image'
			},
			{
				'id': '3d95dbe5-7016-435c-9035-af4a1361b5be',
				'fileName': '3d95dbe5-7016-435c-9035-af4a1361b5be.jpg',
				'orientation': 0,
				'__typename': 'Image'
			},
			{
				'id': '3d95dbe5-7016-435c-9035-af4a1361b5be',
				'fileName': '3d95dbe5-7016-435c-9035-af4a1361b5be.jpg',
				'orientation': 0,
				'__typename': 'Image'
			},
			{
				'id': '98dfaab1-e4df-41b0-ab7b-a857acdd0986',
				'fileName': '98dfaab1-e4df-41b0-ab7b-a857acdd0986.jpg',
				'orientation': 0,
				'__typename': 'Image'
			},
			{
				'id': '84554ab8-59a4-4a61-b39d-46deb5516a4a',
				'fileName': '84554ab8-59a4-4a61-b39d-46deb5516a4a.jpg',
				'orientation': 0,
				'__typename': 'Image'
			}
		]
	};

	constructor(
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>) {

	}

	openRefuseModal() {
		this.dlgSrv.openFromModule(RefuseDialogComponent, this.moduleRef, { });
	}
}
