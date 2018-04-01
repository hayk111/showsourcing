import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from '~app/features/user';
import { AppFile, fileActions, selectFilesAsArray } from '~entity';

@Component({
	selector: 'files-card-app',
	templateUrl: './files-card.component.html',
	styleUrls: ['./files-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesCardComponent implements OnInit {
	files$: Observable<Array<AppFile>>;

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.files$ = this.store.select(selectFilesAsArray);
	}

	onFileAdded(files: Array<File>) {
		const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		this.store.dispatch(fileActions.add(appFiles));
	}

	onFileRemoved(file: AppFile) {
		this.store.dispatch(fileActions.delete([file.id]));
	}
}