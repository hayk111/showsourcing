import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { SampleStatusService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, SampleStatus } from '~core/models';
import { AbstractStatusWorkflowComponent } from '../shared/abstract-status-workflow.component';

@Component({
	selector: 'sample-status-workflow-app',
	templateUrl: '../shared/status-workflow.component.html',
	styleUrls: ['./sample-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleStatusPageComponent extends AbstractStatusWorkflowComponent<SampleStatus, SampleStatusService> implements OnInit {

	constructor(
		protected sampleStatusSrv: SampleStatusService,
		public listSrv: ListPageService<SampleStatus, SampleStatusService>,
		public commonModalSrv: CommonModalService
	) { super(sampleStatusSrv, listSrv, commonModalSrv, ERM.SAMPLE_STATUS); }

}
