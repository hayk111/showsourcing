import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { entityStateToArray } from '~entity/utils';
import { AutoUnsub } from '~utils';
import { selectImages, AppImage, imageActions } from '~app/entity';

@Component({
	selector: 'carousel-selection-app',
	templateUrl: './carousel-selection.component.html',
	styleUrls: ['./carousel-selection.component.scss'],
})
export class CarouselSelectionComponent extends AutoUnsub implements OnInit {
	images$: Observable<Array<AppImage>>;
	pending$: Observable<Array<boolean>>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		const imagesState$: Observable<any> = this.store.select(selectImages);
		this.images$ = imagesState$.map(r => entityStateToArray(r));
		this.pending$ = imagesState$.map(r => r.pending);
	}

	add(img: AppImage) {
		this.store.dispatch(imageActions.add([img]));
	}

	rotate(img: AppImage) {
		this.store.dispatch(imageActions.rotate(img));
	}

	delete(img: AppImage) {
		this.store.dispatch(imageActions.delete([img.id]));
	}

	download(img: AppImage) {
		this.store.dispatch(imageActions.download(img.url));
	}
}
