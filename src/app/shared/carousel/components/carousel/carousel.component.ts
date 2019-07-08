import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { saveAs } from 'file-saver';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { ImageService } from '~entity-services/image/image.service';
import { AppImage } from '~models';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { ImageComponent } from '~shared/image/components/image/image.component';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { DEFAULT_IMG } from '~utils/constants';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService]
})
export class CarouselComponent extends AutoUnsub implements OnInit {

	/** Whether images can be uploaded */
	@Input() static = false;
	/** size in px of the main display */
	@Input() size = 411;
	@Input() hasPreview = false;
	// when the uploader service links an image to an item
	// we need to know to which property we need to link it and if the property is an array
	@Input() imageProperty = 'images';
	@Input() isImagePropertyArray = true;

	@Input() set images(images: AppImage[]) {
		this.uploaderFeedback.setImages(images);
	}
	get images() {
		return this.uploaderFeedback.getImages();
	}

	// index of currently displaying img
	@Input() selectedIndex = 0;
	@Input() entity: any; // entity to which we can link images after an upload
	@Input() objectFit: 'fill' | 'contain' | 'cover' | 'none' = 'contain';
	@Input() showConfirmOnDelete = true;

	@Output() uploaded = new EventEmitter<AppImage[]>();
	@Output() deleted = new EventEmitter<AppImage>();

	@ViewChild('imgApp', { static: false }) imgApp: ImageComponent;
	/** hidden file input */
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef;

	defaultImg = DEFAULT_IMG;


	constructor(
		private imageSrv: ImageService,
		private dlgSrv: DialogService,
		private uploaderFeedback: UploaderFeedbackService,
		private ermSrv: ERMService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() {
		this.uploaderFeedback.init({
			linkedEntity: this.entity,
			imageProperty: this.imageProperty,
			isImagePropertyArray: this.isImagePropertyArray
		});
		this.uploaderFeedback.uploaded$
			.pipe(takeUntil(this._destroy$))
			.subscribe(imgs => this.uploaded.emit(imgs as AppImage[]));
	}

	back(event) {
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		else
			this.selectedIndex = this.images.length - 1;
		event.stopPropagation();
	}

	next(event) {
		if (this.selectedIndex < this.images.length - 1)
			this.selectedIndex++;
		else
			this.selectedIndex = 0;
		event.stopPropagation();
	}

	/** rotates the image by 90 degrees */
	rotate() {
		const img = this.getImg();
		img.orientation = (img.orientation + 1) % 4;
		this.imageSrv.update({
			...img,
			orientation: img.orientation
		}).subscribe();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	async add(files: Array<File>) {
		await this.uploaderFeedback.addImages(files);
		// index at the end for instant feedback
		this.selectedIndex = this.images.length - 1;
	}

	/** deletes the image */
	delete() {
		const img = this.getImg();
		if (this.showConfirmOnDelete) {
			this.dlgSrv.open(ConfirmDialogComponent, {
				text: 'Are you sure you want to remove this image ?',
			}).pipe(
				switchMap(_ => this.onDeleteAccepted(img)),
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				takeUntil(this._destroy$),
			).subscribe(_ => this.deleted.emit(img));
		} else {
			this.deleted.emit(img);
		}
	}

	/** when image is deleted */
	onDeleteAccepted(image: AppImage) {
		if (this.entity) {
			const images = this.entity.images.filter(img => image.id !== img.id);
			this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
			const srv = this.ermSrv.getGlobalServiceForEntity(this.entity);
			return srv.update({ id: this.entity.id, images });
		}
	}

	/** start downloading the image */
	download() {
		const img = this.getImg();
		saveAs(img.urls[5].url, img.fileName);
	}

	getImg() {
		return this.images ? this.images[this.selectedIndex] : null;
	}

	getId() {
		return this.images ? this.images[this.selectedIndex].id : null;
	}

	getRotation(img) {
		if (!img || !img.orientation)
			return 'none';
		else
			return 'rotate(' + (img.orientation * 90) % 360 + 'deg)';
	}

	/** opens the file browser window so the user can select a file he wants to upload */
	openFileBrowser() {
		if (!this.static)
			this.inpFile.nativeElement.click();
	}

	setSelectedIndex(value: number) {
		this.selectedIndex = value;
		// change coming from above
		this.cd.markForCheck();
	}

}
