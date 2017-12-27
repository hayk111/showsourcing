import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { FileActions } from '../../../../store/action/file.action';
import { AppFile } from '../../../../store/model/app-file.model';
import { Observable } from 'rxjs/Observable';
import { selectFilesForTarget } from '../../../../store/selectors/file.selector';
import { selectUser } from '../../../../store/selectors/user.selector';
import { map } from 'rxjs/operators';

@Component({
	selector: 'input-file-entity-app',
	templateUrl: './input-file-entity.component.html',
	styleUrls: ['./input-file-entity.component.scss']
})
export class InputFileEntityComponent implements OnInit {
	private _target: EntityTarget;
	private userId: string;
	files$: Observable<Array<AppFile>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.files$ = this.store.select(selectFilesForTarget(this.target));
		this.store.select(selectUser).pipe(
			map(user => user.id)
		).subscribe(id => this.userId = id);
	}

	onFilesAdded(files: Array<File>) {
		files.forEach(file => {
			const appFile = new AppFile(file, this.target, this.userId);
			this.store.dispatch(FileActions.addNew(appFile));
		});
	}

	@Input()
	set target(target: EntityTarget) {
		this.store.dispatch(FileActions.load(target));
		this._target = target;
	}

	get target() {
		return this._target;
	}

}
