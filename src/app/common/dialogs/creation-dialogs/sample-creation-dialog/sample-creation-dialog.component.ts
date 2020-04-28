import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '~shared/dialog';
import { Product, Supplier, Sample } from '~core/erm3/models';
import { Descriptor } from '~core/erm3';
import { descriptorMock } from '../product-creation-dialog/_temporary-descriptor-product.mock';
import { DynamicFormComponent } from '~shared/descriptor/components/dynamic-form/dynamic-form.component';

@Component({
	selector: 'creation-sample-dialog-app',
	templateUrl: './sample-creation-dialog.component.html',
	styleUrls: ['./sample-creation-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleCreationDialogComponent implements OnInit {

	@ViewChild(DynamicFormComponent) form: DynamicFormComponent;
	@Input() product: Product;
	@Input() supplier: Supplier;
	@Input() createAnother = false;

		// Descriptor options
	descriptor: Descriptor = descriptorMock as any;
	style = 'form';
	columnAmount = 1;
	updateOn = 'change';
	descriptorProperties = [];
	sample: Sample = {};

	constructor(
		private dlgSrv: DialogService,
	) {}


	ngOnInit() {
		// get descriptor
		// assign product and supplier (if exists)
	}

	updateSample(customProperties: any) {
		this.sample.properties = customProperties;
	}

	save() {
		if (!this.sample.properties || !this.sample.name) return;
		this.dlgSrv.data({ ...this.product });
		this.createAnother ?	this.form.reset() : this.dlgSrv.close();
	}

}
