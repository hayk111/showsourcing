import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppImage } from '../../../../store/model/app-image.model';
import { selectImagesForTarget } from '../../../../store/selectors/image.selector';
import { selectUser } from '../../../../store/selectors/user.selector';
import { map } from 'rxjs/operators';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { ImageActions } from '../../../../store/action/images.action';

@Component({
	selector: 'input-image-entity-app',
	templateUrl: './input-image-entity.component.html',
	styleUrls: ['./input-image-entity.component.scss']
})
export class InputImageEntityComponent implements OnInit {
	@Input() label: string;
	private _target: EntityTarget;
	private userId: string;
	images$: Observable<Array<AppImage>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.images$ = this.store.select(selectImagesForTarget(this.target));
		this.store.select(selectUser).pipe(
			map(user => user.id)
		).subscribe(id => this.userId = id);
	}

	async onFileAdded(file: File) {
		const img = await AppImage.newInstance(file, this.target, this.userId);
		this.store.dispatch(ImageActions.addNew(img));
	}

	@Input()
	set target(target: EntityTarget) {
		if (!target)
			throw Error('Target must be defined as input when using an entity component');
		// loading should potentially be moved away from here since if we put this component
		// twice it might load twice. Nevertheless, the switchMap in effects should cancel the
		// first request but it could potentially happen that the request is made twice if the second
		// component appears when the request is done (via an ngIf or smtg)
		this.store.dispatch(ImageActions.load(target));
		this._target = target;
	}

	get target() {
		return this._target;
	}
}
