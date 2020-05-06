import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { UploaderService2 } from '~shared/file/services/uploader.service2';

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

	constructor(private uploadSrv: UploaderService2, private cd: ChangeDetectorRef) {}

	onFileSelect(files: File[]) {
		if (!this.productSelected) {
			return alert('pick a product first');
		}

		this.uploading = true;
		this.uploadSrv.uploadFiles(files, `Product:${this.productSelected.id}`)
			.subscribe(r => {
				if (r.pending) {
					this.pendingFiles = r.files;
				} else {
					this.uploading = false;
					this.cd.detectChanges();
				}
			});
	}

	onImageSelect(files: File[]) {
		if (!this.productSelected) {
			return alert('pick a product first');
		}

		this.uploading = true;
		this.uploadSrv.uploadImages(files, `Product:${this.productSelected.id}`)
			.subscribe(r => {
				if (r.pending) {
					this.pendingImgs = r.files;
				} else {
					this.uploading = false;
					this.cd.detectChanges();
				}
			});
	}

}
