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
	Renderer2,
} from '@angular/core';
import { saveAs } from 'file-saver';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ERMService } from '~core/erm';
import { ImageService } from '~core/erm';
import { AppImage } from '~core/erm';
import { UploaderFeedbackService } from '~shared/file/services/uploader-feedback.service';
import { ImageComponent } from '~shared/image/components/image/image.component';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { DEFAULT_IMG } from '~utils/constants';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploaderFeedbackService],
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
	@Input() hasZoomEffect = true;

	@Output() uploaded = new EventEmitter<AppImage[]>();
	@Output() deleted = new EventEmitter<AppImage>();

	@ViewChild('imgApp', { static: false }) imgApp: ImageComponent;
	@ViewChild('imgApp', { static: false, read: ElementRef }) imgElem: ElementRef<HTMLElement>;
	@ViewChild('imgCtnr', { static: false, read: ElementRef }) imgCtnr: ElementRef<HTMLDivElement>;
	/** hidden file input */
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef<HTMLInputElement>;

	defaultImg = DEFAULT_IMG;

	constructor(
		private imageSrv: ImageService,
		private dlgCommonSrv: DialogCommonService,
		private uploaderFeedback: UploaderFeedbackService,
		private ermSrv: ERMService,
		private cd: ChangeDetectorRef,
		private renderer: Renderer2
	) {
		super();
	}

	ngOnInit() {
		this.uploaderFeedback.init({
			linkedEntity: this.entity,
			imageProperty: this.imageProperty,
			isImagePropertyArray: this.isImagePropertyArray,
		});
		this.uploaderFeedback.uploaded$.pipe(takeUntil(this._destroy$)).subscribe((imgs) => {
			this.uploaded.emit(imgs as AppImage[]);
			// we need this condition since when we add an image the selected index will be length - 1
			// but when property is not an array we have to set manually the index to 0
			if (!this.isImagePropertyArray) this.selectedIndex = 0;
		});
	}

	back(event) {
		if (this.selectedIndex > 0) this.selectedIndex--;
		else this.selectedIndex = this.images.length - 1;
		event.stopPropagation();
	}

	next(event) {
		if (this.selectedIndex < this.images.length - 1) this.selectedIndex++;
		else this.selectedIndex = 0;
		event.stopPropagation();
	}

	/** rotates the image by 90 degrees */
	rotate() {
		const img = this.getImg();
		img.orientation = (img.orientation + 1) % 4;
		this.imageSrv
			.update({
				...img,
				orientation: img.orientation,
			})
			.subscribe();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	async add(files: Array<File>) {
		this.uploaderFeedback.addImages(files).subscribe();
		// index at the end for instant feedback
		this.selectedIndex = this.images.length - 1;
	}

	/** deletes the image */
	delete() {
		const img = this.getImg();
		if (this.showConfirmOnDelete) {
			this.dlgCommonSrv.openConfirmDlg({
				text: 'Are you sure you want to remove this image ?',
			}).data$
			.pipe(
				switchMap(_ => this.onDeleteAccepted(img)),
				takeUntil(this._destroy$),
			).subscribe(_ => this.deleted.emit(img));
		} else {
			this.deleted.emit(img);
		}
	}

	/** when image is deleted */
	onDeleteAccepted(image: AppImage) {
		if (this.entity) {
			const images = this.entity.images.filter((img) => image.id !== img.id);
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
		if (!img || !img.orientation) return 'none';
		else return 'rotate(' + ((img.orientation * 90) % 360) + 'deg)';
	}

	/** opens the file browser window so the user can select a file he wants to upload */
	openFileBrowser() {
		if (!this.static) this.inpFile.nativeElement.click();
	}

	setSelectedIndex(value: number) {
		this.selectedIndex = value;
		// change coming from above
		this.cd.markForCheck();
	}

	/** Trackby function for ngFor */
	trackByFn(index, image) {
		return index;
	}

	zoomin(event: MouseEvent) {
		if (!this.imgElem || !this.hasZoomEffect) return;

		const elem = this.imgElem.nativeElement;
		const ctnr = this.imgCtnr.nativeElement;
		const ctnrBox = ctnr.getBoundingClientRect();
		const deltaEventCtnrX = ctnrBox.left - event.clientX;
		const deltaEventCtnrY = ctnrBox.top - event.clientY;
		const transX = deltaEventCtnrX / 2;
		const transY = deltaEventCtnrY / 2;
		this.renderer.setStyle(elem, 'transform-origin', 'top left');
		this.renderer.setStyle(elem, 'transform', `scale(2) translate(${transX}px, ${transY}px)`);
	}

	zoomout() {
		if (!this.imgElem || !this.hasZoomEffect) return;

		const elem = this.imgElem.nativeElement;
		this.renderer.removeStyle(elem, 'transform');
	}
}
