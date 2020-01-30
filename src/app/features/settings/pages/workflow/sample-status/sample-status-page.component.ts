import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SampleStatusService } from '~core/erm/services';
import { ListPageService } from '~core/list-page';
import { ERM, SampleStatus } from '~core/erm/models';
import { AbstractStatusWorkflowComponent } from '../shared/abstract-status-workflow.component';

@Component({
	selector: 'sample-status-page-app',
	templateUrl: '../shared/status-page.component.html',
	styleUrls: ['./sample-status-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleStatusPageComponent extends AbstractStatusWorkflowComponent<SampleStatus, SampleStatusService> implements OnInit {

	constructor(
		protected sampleStatusSrv: SampleStatusService,
		public listSrv: ListPageService<SampleStatus, SampleStatusService>,
		public dialogCommonSrv: DialogCommonService
	) { super(sampleStatusSrv, listSrv, dialogCommonSrv, ERM.SAMPLE_STATUS); }

}
