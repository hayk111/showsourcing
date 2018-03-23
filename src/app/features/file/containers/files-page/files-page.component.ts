import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '~features/user';
import { fileActions } from '~features/file/store';
import { AppFile } from '~features/file/models';
import { AutoUnsub } from '~utils';
import { Observable } from 'rxjs/Observable';
import { selectFilesAsArray } from '~file/store';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
})
export class FilesPageComponent extends AutoUnsub implements OnInit {
	files$: Observable<Array<AppFile>>;

	constructor(private route: ActivatedRoute, private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.files$ = this.store.select(selectFilesAsArray);
	}

	deleteFile(file: AppFile) {
		this.store.dispatch(fileActions.delete([file.id]));
	}

	onFileAdded(files: Array<File>) {
		const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		this.store.dispatch(fileActions.add(appFiles));
	}

	download(file: AppFile) {
		this.store.dispatch(fileActions.download(file.url || file.data));
	}
}
