import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '~core/entity-services';
import { Product, Request } from '~core/models';
import { DialogService } from '~shared/dialog';
import { NotificationService, NotificationType } from '~shared/notifications';
import { ID } from '~utils';
import { delay } from 'rxjs/operators';
import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';

@Component({
	selector: 'supplier-request-dialog-app',
	templateUrl: './supplier-request-dialog.component.html',
	styleUrls: ['./supplier-request-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierRequestDialogComponent implements OnInit {

	form: FormGroup;
	copyEmail = false;
	request: Request;
	pending = false;
	// if we open once the supplier selector, we want it open until the dialog closes
	opened = false;

	@Input() products: Product[];

	constructor(
		private fb: FormBuilder,
		private dlgSrv: DialogService,
		private requestSrv: RequestService,
		private notifSrv: NotificationService
	) {
		this.form = this.fb.group({
			products: ['', Validators.required],
			requestTemplate: ['', Validators.required],
			recipient: ['', Validators.required],
			sendCopyTo: [''],
			title: ['', Validators.required],
			message: [''],
			shareInformation: ['']
		});
	}

	ngOnInit() {
		this.request = new Request({ products: [], sendCopyTo: [], shareInformation: false, status: 'pending' });
		this.request.products = this.products;
		this.form.patchValue(this.request);
	}

	removeProduct(id: ID) {
		this.products = this.products.filter(product => product.id !== id);
		this.request.products = this.products;
	}

	createRequest() {
		if (!this.form.valid)
			return;
		const newRequest: Request = { ...this.request, ...this.form.value };
		newRequest.products = newRequest.products.map(product => ({ id: product.id }));
		this.pending = true;
		this.requestSrv.create(newRequest)
			.subscribe(_ => {
				this.pending = false;
				this.dlgSrv.open(ReplySentDlgComponent, { height: '586' });
			},
				err => {
					this.dlgSrv.close();
					this.notifSrv.add({
						title: 'Service error when creating request',
						type: NotificationType.ERROR,
						message: 'We could not create the notification due to a server issue'
					});
				}
			);
	}

	arrayToString(array: string[]) {
		return array.join(', ');
	}

}
