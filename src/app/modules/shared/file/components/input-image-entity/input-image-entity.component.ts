import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppImage } from '../../../../store/model/entities/app-image.model';
import { selectUser } from '../../../../store/selectors/entities/user.selector';
import { map } from 'rxjs/operators';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { selectImagesForSelection } from '../../../../store/selectors/selection/selection.selector';
import { UserService } from '../../../user/services/user.service';
import { ImageSlctnActions } from '../../../../store/action/selection/images-selection.action';

@Component({
	selector: 'input-image-entity-app',
	templateUrl: './input-image-entity.component.html',
	styleUrls: ['./input-image-entity.component.scss']
})
export class InputImageEntityComponent implements OnInit {
	@Input() label: string;
	images$: Observable<Array<AppImage>>;

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.images$ = this.store.select(selectImagesForSelection);
	}

	async onFileAdded(file: File) {
		const img = await AppImage.newInstance(file, this.userSrv.getUserId());
		this.store.dispatch(ImageSlctnActions.create(img));
	}


}
