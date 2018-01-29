import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { AppImage } from '../../../../store/model/entities/app-image.model';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { selectImagesForSelection } from '../../../../store/selectors/selection/selection.selector';
import { ImageSlctnActions } from '../../../../store/action/selection/images-selection.action';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'carousel-entity-app',
	templateUrl: './carousel-entity.component.html',
	styleUrls: ['./carousel-entity.component.scss'],
})
export class CarouselEntityComponent extends AutoUnsub implements OnInit {
	images$: Observable<Array<AppImage>>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.images$ = this.store.select(selectImagesForSelection)
			.map(r => entityStateToArray(r));
	}

	rotate(img: AppImage) {
		this.store.dispatch(ImageSlctnActions.rotate(img));
	}

	delete(img: AppImage) {
		this.store.dispatch(ImageSlctnActions.remove(img));
	}

	download(img: AppImage) {
		this.store.dispatch(ImageSlctnActions.download(img));
	}
}
