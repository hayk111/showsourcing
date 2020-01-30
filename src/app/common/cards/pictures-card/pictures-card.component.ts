import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AppImage } from '~core/ORM/models';
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

	@Input() set images(images: AppImage[]) {
		this.uploaderFeedbackSrv.setImages(images);
	}
	get images() {
		return this.uploaderFeedbackSrv.getImages();
	}
	@Input() entity: any;
	@Input() imageProperty = 'images';
	@Input() isImagePropertyArray = true;

	defaultShown = 5;
	currentShown = this.defaultShown - 1;
	selectedIndex = 0;
	pending = false;

	constructor(public uploaderFeedbackSrv: UploaderFeedbackService) { super(); }

	ngOnInit() {
		this.uploaderFeedbackSrv.init({
			linkedEntity: this.entity,
			imageProperty: this.imageProperty,
			isImagePropertyArray: this.isImagePropertyArray
		});
	}

	async addImages(files: File[]) {
		this.pending = true;
		this.uploaderFeedbackSrv.addImages(files)
			.subscribe(_ => this.pending = false);
	}

}
