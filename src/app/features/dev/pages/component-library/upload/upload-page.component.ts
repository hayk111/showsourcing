import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { UploaderService } from '~shared/file/services/uploader.service';

@Component({
	selector: 'upload-page-app',
	templateUrl: './upload-page.component.html',
	styleUrls: ['./upload-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPageComponent {
	uploading = false;
	pendingImgs = [];
	pendingFiles = [];
	productSelected;
	selectExample;
	dropExample;

	constructor(private uploaderSrv: UploaderService, private cd: ChangeDetectorRef) {}

	onFileSelect(files: File[]) {
		if (!this.productSelected) {
			return alert('pick a product first');
		}

		this.uploading = true;
		this.uploaderSrv.uploadFiles(files, `Product:${this.productSelected.id}`)
			.onTempFiles(attachements => this.pendingFiles = attachements)
			.subscribe(_ => {
					this.uploading = false;
					this.cd.detectChanges();
			});
	}

	onImageSelect(files: File[]) {
		if (!this.productSelected) {
			return alert('pick a product first');
		}

		this.uploading = true;
		this.uploaderSrv.uploadImages(files, `Product:${this.productSelected.id}`)
			.onTempImages(tempImgs => this.pendingImgs = tempImgs)
			.subscribe(_ => {
					this.uploading = false;
					this.cd.detectChanges();
			});
	}

}
