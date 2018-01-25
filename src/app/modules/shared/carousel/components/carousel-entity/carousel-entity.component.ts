import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ImageActions } from '../../../../store/action/entities/images.action';
import { AppImage } from '../../../../store/model/entities/app-image.model';
import { selectImagesForTarget } from '../../../../store/selectors/entities/image.selector';

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
		this.store.dispatch(ImageActions.load(this.target));
		this.store.select(selectImagesForTarget(this.target))
		.pipe(takeUntil(this._destroy$))
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
