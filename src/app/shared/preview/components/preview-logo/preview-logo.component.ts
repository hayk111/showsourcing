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

	private _supplier: Supplier;
	@Input() set supplier(supplier: Supplier) {
		this._supplier = supplier;
		if (supplier && supplier.name)
			this.setInitials(supplier.name);
	}
	get supplier() {
		return this._supplier;
	}
	private _image: AppImage;
	@Input() set image(image: AppImage) {
		this._image = image;
	}
	get image() {
		return this._image;
	}

	initials: string;

	constructor(private uploaderSrv: UploaderService) { }

	addLogo(files: File[]) {
		this.uploaderSrv.uploadImages(files, this.supplier, 'logoImage', false, Client.TEAM).subscribe();
	}

	private setInitials(text?: string) {
		// we just take the first 3 separate strings
		const splitName = text.split(' ', 3);
		this.initials = splitName.map(char => char.length ? char[0] : '').join('');
	}

}
