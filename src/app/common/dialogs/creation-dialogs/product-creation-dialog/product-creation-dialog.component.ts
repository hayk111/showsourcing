import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { AppImage, Attachment } from '~core/erm';
import { Product } from 'lib';
import { Descriptor } from '~core/erm3/models';
import { DialogService } from '~shared/dialog';
import { descriptorMock } from './_temporary-descriptor-product.mock';
import { DynamicFormComponent } from '~shared/descriptor/components/dynamic-form/dynamic-form.component';

@Component({
	selector: 'creation-product-dlg-app',
	templateUrl: './product-creation-dialog.component.html',
	styleUrls: ['./product-creation-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreationDialogComponent {
	@Input() createAnother = false;
	@ViewChild(DynamicFormComponent) form: DynamicFormComponent;

	// Descriptor options
	descriptor: Descriptor = descriptorMock as any;
	style = 'form';
	columnAmount = 1;
	updateOn = 'change';
	descriptorProperties = [];
	product: Product = {};

	constructor(private dlgSrv: DialogService) {}

	toggleCheckbox() {
		this.createAnother = !this.createAnother;
	}

	updateProduct(customProperties: any) {
		this.product.propertiesMap = customProperties;
	}

	imagesCreated(createdImages: AppImage[]) {
		// const images = [...this.product.images, ...createdImages];
		// this.product = { ...this.product, images };
	}

	imageDeleted(image: AppImage) {
		// const images = this.product.images.filter(img => img.id !== image.id);
		// this.product = { ...this.product, images };
	}

	filesCreated(createdFiles: Attachment[]) {
		// const attachments = [...this.product.attachments, ...createdFiles];
		// this.product = { ...this.product, attachments };
	}

	fileDeleted(file: Attachment) {
		// const attachments = this.product.attachments.filter(fl => fl.id !== file.id);
		// this.product = { ...this.product, attachments };
	}

	save() {
		if (!this.product.name) return;
		this.dlgSrv.data({...this.product});

		this.createAnother ? this.form.reset() : this.dlgSrv.close();
	}
}
