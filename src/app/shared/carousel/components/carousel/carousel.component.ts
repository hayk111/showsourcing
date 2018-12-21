import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AppImage } from '~models';
import { ImageComponent } from '~shared/image/components/image/image.component';
import { DEFAULT_IMG } from '~utils/constants';
import { ImageService } from '~entity-services/image/image.service';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';
import { PendingImage } from '~utils/pending-image.class';
import { UploaderService } from '~shared/file/services/uploader.service';
import { first, takeUntil, filter, switchMap } from 'rxjs/operators';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { CloseEventType } from '~shared/dialog';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent extends AutoUnsub implements OnInit {
	defaultImg = DEFAULT_IMG;
	// when clicking an image we can open a modal carousel
	modalOpen = false;
	@ViewChild('imgApp') imgApp: ImageComponent;
	/** hidden file input */
	@ViewChild('inpFile') inpFile: ElementRef;

	@Input() set images(images: AppImage[]) {
		this._images = images;
	}
	get images() {
		return [...this._images, ...(this._pendingImages as any)];
	}

	private _images: AppImage[] = [];
	private _pendingImages: PendingImage[] = [];

	// index of currently displaying img
	@Input() selectedIndex = 0;
	@Input() entity: any; // entity to which we can link images after an upload
	@Input() objectFit: 'fill' | 'contain' | 'cover' | 'none' = 'cover';


	constructor(
		private imageSrv: ImageService,
		private dlgSrv: DialogService,
		private uploader: UploaderService,
		private ermSrv: ERMService,
		private cd: ChangeDetectorRef
	) {
		super();
	}

	ngOnInit() { }

	back(event) {
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		event.stopPropagation();
	}

	next(event) {
		if (this.selectedIndex < this.images.length - 1)
			this.selectedIndex++;
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
		if (files.length === 0)
			return;

		const uuids: string[] = await this.addPendingImg(files);
		this.uploader.uploadImages(files, this.entity).pipe(
			first()
		).subscribe(imgs => {
			// removing pending image
			this._pendingImages = this._pendingImages.filter(p => !uuids.includes(p.id));
		}, e => this._pendingImages = []);
	}

	/** adds pending image to the list */
	private async addPendingImg(files: File[]) {
		// adding a pending image so we can see there is an image pending visually
		let pendingImgs: PendingImage[] = files.map(file => new PendingImage(file));
		pendingImgs = await Promise.all(pendingImgs.map(p => p.createData()));
		this._pendingImages.push(...pendingImgs);
		// putting the index at the end so we instantly have feedback the image is being processed
		this.selectedIndex = this.images.length - 1;
		return pendingImgs.map(p => p.id);
	}

	/** deletes the image */
	delete() {
		const img = this.getImg();

		this.dlgSrv.open(ConfirmDialogComponent, {
			text: 'Are you sure you want to remove this image ?',
		}).pipe(
			takeUntil(this._destroy$),
			filter(evt => evt.type === CloseEventType.OK),
			switchMap(_ => this.onDeleteAccepted(img))
		).subscribe();
	}

	/** when image is deleted */
	onDeleteAccepted(image: AppImage) {
		const images = this.entity.images.filter(img => image.id !== img.id);
		this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
		const srv = this.ermSrv.getGlobalServiceForEntity(this.entity);
		return srv.update({ id: this.entity.id, images });
	}

	/** start downloading the image */
	download() {
		const img = this.getImg();
		this.imageSrv.download(img);
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
		this.inpFile.nativeElement.click();
	}

	/** opens the modal carousel */
	openModal(index?: number) {
		if (index)
			this.selectedIndex = index;
		this.modalOpen = true;
		// since it can be opened from outside..
		this.cd.markForCheck();
	}

	/** closes the modal */
	closeModal() {
		this.modalOpen = false;
	}

}
