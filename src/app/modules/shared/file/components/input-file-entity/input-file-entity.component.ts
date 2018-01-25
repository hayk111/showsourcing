import { Component, OnInit, Input } from '@angular/core';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { FileActions } from '../../../../store/action/file.action';
import { AppFile } from '../../../../store/model/app-file.model';
import { Observable } from 'rxjs/Observable';
import { selectUser } from '../../../../store/selectors/user.selector';
import { map } from 'rxjs/operators';
import { selectFilesForTarget } from '../../../../store/selectors/target/file.selector';

@Component({
	selector: 'input-file-entity-app',
	templateUrl: './input-file-entity.component.html',
	styleUrls: ['./input-file-entity.component.scss']
})
export class InputFileEntityComponent implements OnInit {
	@Input() label: string;
	private _target: EntityTarget;
	files$: Observable<Array<AppFile>>;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.files$ = this.store.select(selectFilesForTarget(this.target));
	}

	onFileAdded(file: File) {
		const appFile = new AppFile(file, this.target, this.store);
		this.store.dispatch(FileActions.addNew(appFile));
	}

	@Input()
	set target(target: EntityTarget) {
		if (!target)
			throw Error('Target must be defined as input when using an entity component');
		this.store.dispatch(FileActions.load(target));
		this._target = target;
	}

	get target() {
		return this._target;
	}

}
