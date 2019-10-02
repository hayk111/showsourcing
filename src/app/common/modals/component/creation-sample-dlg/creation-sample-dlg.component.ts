import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SampleDescriptor } from '~core/descriptors';
import { SampleService, UserService } from '~core/entity-services';
import { Product, Sample, Supplier } from '~core/models';
import { CloseEventType, DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { TranslateService } from '@ngx-translate/core';
import { uuid } from '~utils';
import { Observable } from 'rxjs';

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
		private notifSrv: NotificationService,
		private translate: TranslateService,
		private userSrv: UserService
	) {
	}

	ngOnInit() {
		const user = this.userSrv.userSync;
		const assignee = {
			id: user.id,
			lastName: user.lastName,
			firstName: user.firstName
		};
		this.sampleDescriptor = new SampleDescriptor([
			'name', 'assignee', 'description', 'product', 'supplier'
		]);
		this.sampleDescriptor.modify([
			{ name: 'name', metadata: { placeholder: this.translate.instant('placeholder.sample-name') } },
			{ name: 'assignee', metadata: { placeholder: this.translate.instant('select-assignee'), width: 495 } },
			{
				name: 'product',
				label: this.translate.instant('label.linked-to-product'),
				metadata: {
					placeholder: this.translate.instant('placeholder.search-your-product'),
					width: 495
				}
			},
			{
				name: 'supplier',
				label: this.translate.instant('label.linked-to-supplier'),
				metadata: {
					placeholder: this.translate.instant('placeholder.search-your-supplier'),
					width: 495
				}
			},
		]);

		if (!this.sample) {
			const supplier = this.supplier ? this.supplier : (this.product && this.product.supplier);
			this.sample = new Sample({
				...this.product && { product: { id: this.product.id, name: this.product.name } },
				...supplier && { supplier: { id: supplier.id, name: supplier.name } },
				assignee
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
						title: this.translate.instant('title.sample-created'),
						message: this.translate.instant('message.sample-created-with-success')
					});
					this.sampleSrv.onUpdateSampleList();
				},
				err => {
					this.notifSrv.add({
						type: NotificationType.ERROR,
						title: this.translate.instant('title.sample-not-created'),
						message: this.translate.instant('message.your-product-not-created')
					});
				}
			);
		}
	}

	cancel() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}

	close(created$?: Observable<Sample>) {
		this.dlgSrv.close({ type: CloseEventType.OK, data: { sample: this.sample, created$ } });
	}

	private resetIds(sample) {
		sample = { ...sample, id: uuid(), name: '', description: '' };
		return sample;
	}

}
