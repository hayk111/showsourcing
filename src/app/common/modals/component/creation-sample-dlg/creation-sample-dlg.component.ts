import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SampleService } from '~core/entity-services';
import { ERM, Sample } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { DynamicField } from '~shared/dynamic-forms';
import { NotificationService, NotificationType } from '~shared/notifications';
import { translate } from '~utils';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'creation-sample-dlg-app',
	templateUrl: './creation-sample-dlg.component.html',
	styleUrls: ['./creation-sample-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: []
})
export class CreationSampleDlgComponent implements OnInit {

	@Input() sample: Sample;

	dynamicFields: DynamicField[] = [
		{ name: 'name', type: 'text', required: true, label: translate('name'), placeholder: translate('Sample name'), },
		{
			name: 'assignee',
			type: 'selector',
			label: translate('assigned to'),
			metadata: {
				target: ERM.USER.singular,
				type: 'entity',
				placeholder: translate('select assignee'),
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{ name: 'description', type: 'textarea', label: translate('Description'), metadata:  { rows: 5 } },
		{
			name: 'product',
			type: 'selector',
			label: translate('Linked to Product'),
			metadata: {
				target: ERM.PRODUCT.singular,
				type: 'entity',
				placeholder: translate('search for your product'),
				canCreate: true,
				hasBadge: true,
				width: 495
			}
		},
		{
			name: 'supplier',
			type: 'selector',
			label: translate('Linked to Supplier'),
			metadata: {
				target: ERM.SUPPLIER.singular,
				type: 'entity',
				placeholder: translate('search for your supplier'),
				canCreate: true,
				hasBadge: true,
				width: 495
			},
		}
	];
	createAnother = false;

	constructor(
		private dlgSrv: DialogService,
		private sampleSrv: SampleService,
		private notifSrv: NotificationService,
		private route: ActivatedRoute
	) {
	}

	ngOnInit() {
		if (!this.sample) {
			this.sample = new Sample({});
		}
	}

	updateSample(sample: Sample) {
		this.sample = { ...this.sample, ...sample };
	}

	save ()  {
		if (this.sample && this.sample.name) {
			this.sampleSrv.create(this.sample).subscribe(sample => {
				if (this.createAnother) {
					this.dlgSrv.open(CreationSampleDlgComponent, { sample: { ...this.sample, name: ''} });
				} else {
					this.close();
				}
				this.notifSrv.add({
					type: NotificationType.SUCCESS,
					title: `Sample created`,
					message: 'Your sample has been created with success'
				});
			},
			err => {
				this.notifSrv.add({
					type: NotificationType.ERROR,
					title: `Sample created`,
					message: 'Your sample could not been created'
				});
			});
		}
	}
	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.OK, data: { sample: this.sample } });
	}

}
