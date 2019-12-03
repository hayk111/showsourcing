import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { AppImage } from '~core/models';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'pictures-card-app',
	templateUrl: './pictures-card.component.html',
	styleUrls: ['./pictures-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService]
})
export class PicturesCardComponent extends AutoUnsub implements OnInit {

	private _images: AppImage[];
	@Input() set images(images: AppImage[]) {
		this._images = images;
		this.uploaderFeedbackSrv.setImages(images);
	}
	get images() {
		return this._images;
	}
	@Input() entity: any;
	@Input() imageProperty = 'images';
	@Input() isImagePropertyArray = true;

	defaultShown = 4;
	currentShown = this.defaultShown;
	selectedIndex = 0;

	constructor(public uploaderFeedbackSrv: UploaderFeedbackService) { super(); }

	ngOnInit() {
		this.uploaderFeedbackSrv.init({
			linkedEntity: this.entity,
			imageProperty: this.imageProperty,
			isImagePropertyArray: this.isImagePropertyArray
		});
	}

	async addImages(files: File[]) {
		this.uploaderFeedbackSrv.addImages(files).subscribe();
	}

}
