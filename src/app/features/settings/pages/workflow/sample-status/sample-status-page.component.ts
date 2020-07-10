import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SampleStatusService } from '~core/erm';
import { ListHelper2Service } from '~core/list-page2';
import { ERM, SampleStatus } from '~core/erm';
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
		public listHelper: ListHelper2Service,
		public dialogCommonSrv: DialogCommonService
	) { super(sampleStatusSrv, listHelper, dialogCommonSrv, ERM.SAMPLE_STATUS); }

}
