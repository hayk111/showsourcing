import { ChangeDetectionStrategy, Component, ChangeDetectorRef,  NgZone, ViewChild, ElementRef } from '@angular/core';
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

	@ViewChild('inpFile') inpFile: ElementRef<HTMLInputElement>;
	@ViewChild('inpImg') inpImg: ElementRef<HTMLInputElement>;

	constructor(
		private uploaderSrv: UploaderService,
		private cdRef: ChangeDetectorRef
	) {}

	onFileSelect(files: File[]) {
		this.checkSelected();

		this.uploading = true;
		this.uploaderSrv.uploadFiles(files, `Product:${this.productSelected.id}`)
			// local files
			.onTempFiles(attachements => {
				this.pendingFiles = attachements;
				this.cdRef.markForCheck();
			})
			.subscribe(() => this.onSuccess());
	}

	onImageSelect(files: File[]) {
		this.checkSelected();

		this.uploading = true;
		this.uploaderSrv.uploadImages(files, `Product:${this.productSelected.id}`)
			// local img, the url is base64 encoded image
			.onTempImages(tempImgs => {
				this.pendingImgs = tempImgs;
				this.cdRef.markForCheck();
			})
			.subscribe(() => this.onSuccess());
	}

	private onSuccess() {
		this.uploading = false;
		this.pendingFiles = undefined;
		this.pendingImgs = undefined;
		this.cdRef.detectChanges();
	}

	private checkSelected() {
		if (!this.productSelected) {
			alert('pick a product first, i am going to reload the page now');
			location.reload();
		}
	}

}
