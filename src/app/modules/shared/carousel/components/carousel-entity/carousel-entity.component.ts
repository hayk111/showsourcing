import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { AppImage } from '../../../../store/model/entities/app-image.model';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { selectImagesForCurrentTarget } from '../../../../store/selectors/target/target.selector';
import { ImageTargetActions } from '../../../../store/action/target/images.action';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'carousel-entity-app',
	templateUrl: './carousel-entity.component.html',
	styleUrls: ['./carousel-entity.component.scss'],
})
export class CarouselEntityComponent extends AutoUnsub implements OnInit {
	images$: Observable<Array<AppImage>>;
	pending$: Observable<Array<boolean>>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		const imagesState$ = this.store.select(selectImagesForCurrentTarget);
		this.images$ = imagesState$.map(r => entityStateToArray(r));
		this.pending$ = imagesState$.map(r => r.pending);
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
