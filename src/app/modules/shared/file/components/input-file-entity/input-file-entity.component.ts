import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { Observable } from 'rxjs/Observable';
import { selectUser } from '../../../../store/selectors/entities/user.selector';
import { map } from 'rxjs/operators';
import { selectFilesForSelection } from '../../../../store/selectors/selection/selection.selector';
import { UserService } from '../../../user/services/user.service';
import { FileSlctnActions } from '../../../../store/action/selection/file-selection.action';

@Component({
	selector: 'input-file-entity-app',
	templateUrl: './input-file-entity.component.html',
	styleUrls: ['./input-file-entity.component.scss']
})
export class InputFileEntityComponent implements OnInit {
	@Input() label: string;
	files$: Observable<Array<AppFile>>;

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.files$ = this.store.select(selectFilesForSelection);
	}

	onFileAdded(file: File) {
		const appFile = new AppFile(file, this.userSrv.getUserId());
		this.store.dispatch(FileSlctnActions.create(appFile));
	}

}
