import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget, entityStateToArray, EntityState } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { Observable } from 'rxjs/Observable';
import { selectUser } from '../../../../store/selectors/entities/user.selector';
import { map } from 'rxjs/operators';
import { selectFilesForSelection } from '../../../../store/selectors/selection/selection.selector';
import { UserService } from '../../../user/services/user.service';
import { FileSlctnActions } from '../../../../store/action/selection/file-selection.action';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';

@Component({
	selector: 'input-file-entity-app',
	templateUrl: './input-file-entity.component.html',
	styleUrls: ['./input-file-entity.component.scss']
})
export class InputFileEntityComponent extends AutoUnsub implements OnInit {
	@Input() label: string;
	files$: Observable<EntityState<AppFile>>;
	filesArray: Array<AppFile>;
	pending$: Observable<boolean>;
	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.files$ = this.store.select(selectFilesForSelection);
		this.files$
		.pipe(takeUntil(this._destroy$))
		.subscribe((r: EntityState<any>) => this.filesArray = entityStateToArray(r));
	}

	onFileAdded(file: File) {
		const appFile = new AppFile(file, this.userSrv.getUserId());
		this.store.dispatch(FileSlctnActions.add(appFile));
	}

}
