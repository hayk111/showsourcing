import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SampleDescriptor } from '~core/descriptors';
import { SampleService } from '~core/entity-services';
import { Product, Sample, Supplier } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { translate, uuid } from '~utils';

@Component({
	selector: 'creation-sample-dlg-app',
	templateUrl: './creation-sample-dlg.component.html',
	styleUrls: ['./creation-sample-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreationSampleDlgComponent implements OnInit {

	@Input() sample: Sample;
	@Input() product: Product;
	@Input() supplier: Supplier;
	@Input() createAnother = false;

	sampleDescriptor: SampleDescriptor;


	constructor(
		private dlgSrv: DialogService,
		private sampleSrv: SampleService,
		private notifSrv: NotificationService
	) {
	}

	ngOnInit() {
		this.sampleDescriptor = new SampleDescriptor([
			'name', 'assignee', 'description', 'product', 'supplier'
		]);
		this.sampleDescriptor.modify([
			{ name: 'name', metadata: { placeholder: translate('Sample name') } },
			{ name: 'assignee', metadata: { placeholder: translate('select assignee'), width: 495 } },
			{
				name: 'product',
				label: translate('Linked to Product'),
				metadata: {
					placeholder: translate('search for your product'),
					width: 495
				}
			},
			{
				name: 'supplier',
				label: translate('Linked to Supplier'),
				metadata: {
					placeholder: translate('search for your supplier'),
					width: 495
				}
			},
		]);

		if (!this.sample) {
			const supplier = this.supplier ? this.supplier : (this.product && this.product.supplier);
			this.sample = new Sample({
				...this.product && { product: { id: this.product.id, name: this.product.name } },
				...supplier && { supplier: { id: supplier.id, name: supplier.name } }
			});
		}
	}

	updateSample(sample: Sample) {
		this.sample = { ...this.sample, ...sample };
	}

	save() {
		if (this.sample && this.sample.name) {
			this.sampleSrv.create(this.sample).subscribe(
				sample => {
					if (this.createAnother) {
						sample = this.resetIds(sample);
						this.dlgSrv.open(CreationSampleDlgComponent, { sample, createAnother: true });
					} else {
						this.close();
					}
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: `Sample created`,
						message: 'Your sample has been created with success'
					});
					this.sampleSrv.onUpdateSampleList();
				},
				err => {
					this.notifSrv.add({
						type: NotificationType.ERROR,
						title: `Sample created`,
						message: 'Your sample could not been created'
					});
				}
			);
		}
	}
	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.OK, data: { sample: this.sample } });
	}

	private resetIds(sample) {
		sample = { ...sample, id: uuid(), name: '', description: '' };
		return sample;
	}

}
