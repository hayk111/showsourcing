import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SampleDescriptor } from '~core/descriptors';
import { SampleService, UserService } from '~core/erm';
import { Product, Sample, Supplier } from '~core/erm';
import { CloseEventType, DialogService } from '~shared/dialog';
import { ToastService, ToastType } from '~shared/toast';
import { uuid } from '~utils';

@Component({
	selector: 'creation-sample-dialog-app',
	templateUrl: './sample-creation-dialog.component.html',
	styleUrls: ['./sample-creation-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleCreationDialogComponent implements OnInit {

	@Input() sample: Sample;
	@Input() product: Product;
	@Input() supplier: Supplier;
	@Input() createAnother = false;

	sampleDescriptor: SampleDescriptor;


	constructor(
		private dlgSrv: DialogService,
		private sampleSrv: SampleService,
		private toastSrv: ToastService,
		private userSrv: UserService
	) {
	}

	ngOnInit() {
		this.sampleDescriptor = new SampleDescriptor([
			'name', 'assignee', 'description', 'product', 'supplier'
		]);
		this.sampleDescriptor.modify([
			{ name: 'name', metadata: { placeholder: 'sample-name' } },
			{ name: 'assignee', metadata: { placeholder: 'select-assignee', width: 495 } },
			{
				name: 'product',
				label: 'linked-to-product',
				metadata: {
					placeholder: 'search-your-product',
					width: 495
				}
			},
			{
				name: 'supplier',
				label: 'linked-to-supplier',
				metadata: {
					placeholder: 'search-your-supplier',
					width: 495
				}
			},
		]);

		if (!this.sample) {
			const supplier = this.supplier ? this.supplier : (this.product && this.product.supplier);
			this.sample = new Sample({
				...this.product && { product: { id: this.product.id, name: this.product.name } },
				...supplier && { supplier: { id: supplier.id, name: supplier.name } },
				assignee: { id: this.userSrv.userSync.id, firstName: this.userSrv.userSync.firstName, lastName: this.userSrv.userSync.lastName }
			});
		}
	}

	updateSample(sample: Sample) {
		this.sample = { ...this.sample, ...sample };
	}

	save() {
		if (this.sample && this.sample.name) {
			// this way we can notify that the reference has been created
			this.sampleSrv.waitForOne(`id == "${this.sample.id}" AND reference.@size > 0`)
				.subscribe(_ => this.sampleSrv.onUpdateSampleList());

			this.sampleSrv.create(this.sample).subscribe(
				sample => {
					if (this.createAnother) {
						sample = this.resetIds(sample);
						this.dlgSrv.open(SampleCreationDialogComponent, { sample, createAnother: true });
					} else {
						this.close();
					}
					this.toastSrv.add({
						type: ToastType.SUCCESS,
						title: 'title.sample-created',
						message: 'message.sample-created-with-success'
					});
					this.sampleSrv.onUpdateSampleList();
				},
				err => {
					this.toastSrv.add({
						type: ToastType.ERROR,
						title: 'title.sample-not-created',
						message: 'message.your-sample-not-created'
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
