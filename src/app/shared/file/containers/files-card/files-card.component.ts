import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { UserService } from '~app/features/user';
import { AppFile, fromFile } from '~entity';
import { DEFAULT_FILE_IMG } from '~app/app-root/utils';

@Component({
	selector: 'files-card-app',
	templateUrl: './files-card.component.html',
	styleUrls: ['./files-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesCardComponent implements OnInit {
	files$: Observable<Array<AppFile>>;
	defaultImg = DEFAULT_FILE_IMG;

	constructor(private store: Store<any>, private userSrv: UserService) { }

	ngOnInit() {
		this.files$ = this.store.select(fromFile.selectArray);
	}

	onFileAdded(files: Array<File>) {
		const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		this.store.dispatch(fromFile.Actions.add(appFiles));
	}

	onFileRemoved(file: AppFile) {
		this.store.dispatch(fromFile.Actions.delete([file.id]));
	}
}
