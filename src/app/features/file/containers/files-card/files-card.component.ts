import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { selectFilesAsArray, FileActions } from '~app/features/file/store';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { UserService } from '~app/features/user';
import { AppFile } from '~app/features/file/models';

@Component({
	selector: 'files-card-app',
	templateUrl: './files-card.component.html',
	styleUrls: ['./files-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesCardComponent implements OnInit {
	files$: Observable<Array<AppFile>>;

	constructor(private store: Store<any>, private userSrv: UserService) {}

	ngOnInit() {
		this.files$ = this.store.select(selectFilesAsArray);
	}

	onFileAdded(files: Array<File>) {
		const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		this.store.dispatch(FileActions.add(appFiles));
	}

	onFileRemoved(file: AppFile) {
		this.store.dispatch(FileActions.delete([file.id]));
	}
}
