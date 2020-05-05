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

	constructor(private uploadSrv: UploaderService2) {}

	onFileSelect(files: File[]) {
		this.uploading = true;
		this.uploadSrv.uploadFiles(files)
			.subscribe(_ => this.uploading = false);
	}
}
