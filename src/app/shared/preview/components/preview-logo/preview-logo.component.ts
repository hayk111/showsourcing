import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AppImage, Supplier } from '~core/models';
import { UploaderService } from '~shared/file/services/uploader.service';

@Component({
	selector: 'preview-logo-app',
	templateUrl: './preview-logo.component.html',
	styleUrls: ['./preview-logo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewLogoComponent {

	@Input() supplier: Supplier;
	@Input() set image(image: AppImage) {
		this._image = image;
	}
	get image() {
		return this._image;
	}

	private _image: AppImage;

	constructor(private uploaderSrv: UploaderService) { }

	addLogo(files: File[]) {
		this.uploaderSrv.uploadImages(files, this.supplier, 'logoImage', false, Client.TEAM).subscribe();
	}

}
