import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectImagesForTarget } from '../../../../store/selectors/image.selector';
import { AppImage } from '../../../../store/model/app-image.model';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ImageActions } from '../../../../store/action/images.action';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'carousel-entity-app',
	templateUrl: './carousel-entity.component.html',
	styleUrls: ['./carousel-entity.component.scss'],
})
export class CarouselEntityComponent extends AutoUnsub implements OnInit {
	@Input() target: EntityTarget;
	images: Array<AppImage> = [];

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.select(selectImagesForTarget(this.target))
			.takeUntil(this._destroy$)
			.subscribe(imgs => this.images = imgs);
	}

	rotate(img: AppImage) {
		this.store.dispatch(ImageActions.rotate(img));
	}

	delete(img: AppImage) {
		this.store.dispatch(ImageActions.delete(img));
	}

	download(img: AppImage) {
		this.store.dispatch(ImageActions.download(img));
	}
}
