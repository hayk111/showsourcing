import 'rxjs/add/operator/map';

import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { entityStateToArray } from '~entity/utils';
import { AutoUnsub, DEFAULT_IMG } from '~utils';
import { fromImage, AppImage, } from '~app/entity';
import { UserService } from '~app/features/user';

@Component({
	selector: 'carousel-card-app',
	templateUrl: './carousel-card.component.html',
	styleUrls: ['./carousel-card.component.scss'],
})
export class CarouselCardComponent extends AutoUnsub implements OnInit {
	// whether the different elements are displayed
	@Input() hasModalCarousel = true;
	@Input() hasPreview = true;
	@Input() hasInlineCarousel = true;
	@Input() title = '';
	images$: Observable<Array<AppImage>>;
	pending$: Observable<Array<boolean>>;
	/** index of the currently selected image */
	selectedIndex = 0;
	/** hidden file input */
	@ViewChild('inpFile') inpFile: ElementRef;
	/** default image displayed when no image  */
	defaultImg = DEFAULT_IMG;

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		const imagesState$: Observable<any> = this.store.select(fromImage.selectState);
		this.images$ = imagesState$.map(r => entityStateToArray(r));
		this.pending$ = imagesState$.map(r => r.pending);
	}
	/** opens the file browser so the user can select a file he wants to upload */
	openFileBrowser() {
		this.inpFile.nativeElement.click();
	}

	/** when adding a new image, by selecting in the file browser or by dropping it on the component */
	add(files: Array<File>) {
		const conversions = files.map(file => AppImage.newInstance(file, this.userSrv.userId));
		Promise.all(conversions).then(appImages => this.store.dispatch(fromImage.Actions.add(appImages)));
	}

	rotate(img: AppImage) {
		this.store.dispatch(fromImage.Actions.rotate(img));
	}

	delete(img: AppImage) {
		this.store.dispatch(fromImage.Actions.delete([img.id]));
	}

	download(img: AppImage) {
		this.store.dispatch(fromImage.Actions.download(img.url));
	}

	// when a preview is clicked we want to display the image that was in the preview
	onPreviewClick(index: number) {
		this.selectedIndex = index;
	}

}
