import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { SampleStatusService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, SampleStatus } from '~core/models';

@Component({
	selector: 'sample-status-workflow-app',
	templateUrl: '../common-status-workflow.component.html',
	styleUrls: ['./sample-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleStatusWorkflowComponent implements OnInit {

	constructor(
		private sampleStatusSrv: SampleStatusService,
		private listSrv: ListPageService<SampleStatus, SampleStatusService>,
		public commonModalSrv: CommonModalService
	) { }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.SAMPLE_STATUS,
			entitySrv: this.sampleStatusSrv,
			selectParams: { sortBy: 'step', descending: false },
			entityMetadata: ERM.SAMPLE_STATUS
		});
	}

}
