import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { SampleStatusService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, SampleStatus } from '~core/models';
import { AbstractStatusWorkflowComponent } from '~features/settings/containers/abstract-status-workflow.component';

@Component({
	selector: 'sample-status-workflow-app',
	templateUrl: '../../../../common/workflow/common-status-workflow.component.html',
	styleUrls: ['./sample-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleStatusWorkflowComponent extends AbstractStatusWorkflowComponent<SampleStatus, SampleStatusService> implements OnInit {

	constructor(
		private sampleStatusSrv: SampleStatusService,
		public listSrv: ListPageService<SampleStatus, SampleStatusService>,
		public commonModalSrv: CommonModalService
	) { super(sampleStatusSrv, listSrv, commonModalSrv, ListPageKey.SAMPLE_STATUS, ERM.SAMPLE_STATUS); }

}
