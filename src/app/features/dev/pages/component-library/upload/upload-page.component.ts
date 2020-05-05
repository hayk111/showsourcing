import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UploaderService2 } from '~shared/file/services/uploader.service2';

@Component({
	selector: 'upload-page-app',
	templateUrl: './upload-page.component.html',
	styleUrls: ['./upload-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadPageComponent {
	uploading = false;
	nodeId = 'Product:fde0a3fc-c586-4db9-8821-7b7be5a777b3';
	pendingImgs = [];
	pendingFiles = [];

	constructor(private uploadSrv: UploaderService2) {}

	onFileSelect(files: File[]) {
		this.uploading = true;
		this.uploadSrv.uploadFiles(files, this.nodeId)
			.subscribe(r => {
				if (r.pending) {
					this.pendingFiles = r.files;
				} else {
					this.uploading = false;
				}
			});
	}

	onImageSelect(files: File[]) {
		this.uploading = true;
		this.uploadSrv.uploadImages(files, this.nodeId)
			.subscribe(r => {
				if (r.pending) {
					this.pendingImgs = r.files;
				} else {
					this.uploading = false;
				}
			});
	}
}
