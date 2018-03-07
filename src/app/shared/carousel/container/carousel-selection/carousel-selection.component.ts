import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppImage } from '~features/file/models';
import { ImageTargetActions } from '~features/file/store/actions';
import { selectImagesForCurrentTarget } from '~store/selectors/target/target.selector';
import { entityStateToArray } from '~store/utils';
import { AutoUnsub } from '~utils';

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
		const imagesState$: Observable<any> = this.store.select(
			selectImagesForCurrentTarget
		);
		this.images$ = imagesState$.map(r => entityStateToArray(r));
		this.pending$ = imagesState$.map(r => r.pending);
	}

	add(img: AppImage) {
		this.store.dispatch(ImageTargetActions.add(img));
	}

	rotate(img: AppImage) {
		this.store.dispatch(ImageTargetActions.rotate(img));
	}

	delete(img: AppImage) {
		this.store.dispatch(ImageTargetActions.remove(img));
	}

	download(img: AppImage) {
		this.store.dispatch(ImageTargetActions.download(img));
	}
}
