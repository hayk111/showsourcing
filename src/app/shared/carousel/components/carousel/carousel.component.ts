import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component,
	ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild
} from '@angular/core';
import { saveAs } from 'file-saver';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, tap, filter, first, switchMap, take } from 'rxjs/operators';
import { api, Image } from 'showsourcing-api-lib';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { UploaderService } from '~shared/file/services/uploader.service';
import { ImageComponent } from '~shared/image/components/image/image.component';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { DEFAULT_IMG } from '~utils/constants';
import { ToastType } from '~shared/toast';
import _ from 'lodash';

@Component({
	selector: 'carousel-app',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
	providers: [],
})
export class CarouselComponent extends AutoUnsub implements OnInit {
	/** nodeId from which we get the images */
	@Input() nodeId: string;
	/** alternatively we can input images */
	@Input() images: Image[];
	/** Whether images can be uploaded */
	@Input() static = false;
	/** size in px of the main display */
	@Input() size = 410;
	@Input() hasPreview = false;

	// index of currently displaying img
	@Input() selectedIndex = 0;
	@Input() objectFit: 'fill' | 'contain' | 'cover' | 'none' = 'contain';
	@Input() showConfirmOnDelete = true;
	@Input() hasZoomEffect = true;

	@Output() uploaded = new EventEmitter<Image[]>();
	@Output() deleted = new EventEmitter<Image>();

	@ViewChild('imgApp', { static: false }) imgApp: ImageComponent;
	@ViewChild('imgApp', { static: false, read: ElementRef }) imgElem: ElementRef<HTMLElement>;
	@ViewChild('imgCtnr', { static: false, read: ElementRef }) imgCtnr: ElementRef<HTMLDivElement>;
	/** hidden file input */
	@ViewChild('inpFile', { static: false }) inpFile: ElementRef<HTMLInputElement>;

	defaultImg = DEFAULT_IMG;
	private images$ = new BehaviorSubject<Image[]>([]);

	pending = false;

	constructor(
		private dlgCommonSrv: DialogCommonService,
		private uploaderSrv: UploaderService,
		private cdr: ChangeDetectorRef,
		private renderer: Renderer2
	) {
		super();
	}

	ngOnInit() {
		this.images$.subscribe(imgs => {
			this.images = imgs;
			console.log('CarouselComponent -> ngOnInit -> this.images444', this.images);

			this.cdr.markForCheck();
		});

		if (this.nodeId) {
			api.Image.findByNodeId$(this.nodeId, {
				sort: { direction: 'ASC', property: 'createdAt' }
			}).data$
				.pipe(
					filter((images: Image[]) => {
						return images.length && !!images[images.length - 1].url;
					}),
					tap((images: any[]) => {
						console.log('images===========', images);
						this.images$.next(images);
						this.selectedIndex = images.length - 1;
					})
				)
				.subscribe();
		}
	}

	back(event) {
		if (this.selectedIndex > 0) this.selectedIndex--;
		else this.selectedIndex = this.images.length - 1;
		event.stopPropagation();
	}

	next(event) {
		if (this.selectedIndex < this.images.length - 1) {
			this.selectedIndex++;
		} else {
			this.selectedIndex = 0;
		}
		event.stopPropagation();
	}

	/** rotates the image by 90 degrees */
	rotate() {
		const img = this.getImg();
		const imgIndex = _.findIndex(this.images, {id: img.id});
		img.orientation = (img.orientation + 1) % 4;
		const updatedImages = [...this.images];
		updatedImages[imgIndex] = {...img, orientation: img.orientation};

		api.Image.update([{
			id: img.id,
			orientation: img.orientation,
		}])
			.local$
			.pipe(
				first(),
				takeUntil(this._destroy$),
			)
			.subscribe(() => {
				this.images = updatedImages;
				this.cdr.markForCheck();
			});
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	add(files: Array<File>) {
		this.uploaderSrv.uploadImages(files, this.nodeId)
			.onTempImages(temp => {
				this.selectedIndex = this.images.length;
				this.images = [...this.images, ...temp];
				this.cdr.markForCheck();
			})
			.subscribe((uploadedImgs: Image[]) => {
				this.uploaded.emit();
				// const updatedImgs: Image[] = [...this.images.filter(img => img.type !== 'pending'), ...uploadedImgs];
				// this.selectedIndex = updatedImgs.length - 1;
				console.log('CarouselComponent -> add -> this.images 222', this.images, uploadedImgs);
				// this.images$.next(updatedImgs);
				this.uploaderSrv.showToast(`Uploaded ${files.length} image(s)`);
			}, error => {
				this.images = this.images.filter(img => img.type !== 'pending');
				this.selectedIndex = this.images.length - 1;
				this.cdr.markForCheck();
				this.uploaderSrv.showToast(error.message, 'upload failed', ToastType.ERROR);
			});
	}

	/** deletes the image */
	delete() {
		const img = this.getImg();
		if (this.showConfirmOnDelete) {
			this.dlgCommonSrv.openConfirmDlg({
				text: 'Are you sure you want to remove this image ?',
			}).data$
			.pipe(
				switchMap(_ => api.Image.delete([{id: img.id}]).local$),
				takeUntil(this._destroy$)
			).subscribe();
		} else {
			this.deleted.emit(img);
		}
	}

	/** when image is deleted */
	onDeleteAccepted(image: Image) {
		throw Error('not implemented yet');
		// if (this.entity) {
		// 	const images = this.entity.images.filter((img) => image.id !== img.id);
		// 	this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
		// 	const srv = this.ermSrv.getGlobalServiceForEntity(this.entity);
		// 	return srv.update({ id: this.entity.id, images });
		// }
	}

	/** start downloading the image */
	download() {
		const img = this.getImg();
		saveAs(img.url, img.fileName);
	}

	open(comp) {
		comp.open();
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
	openFileBrowser(ev) {
		ev.stopPropagation();
		if (!this.static) {
			this.inpFile.nativeElement.click();
		}
	}

	setSelectedIndex(value: number) {
		this.selectedIndex = value;
		// change coming from above
		this.cdr.markForCheck();
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
