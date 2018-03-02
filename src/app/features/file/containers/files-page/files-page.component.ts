import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '~features/user';
import { FileTargetActions } from '~features/file/store/actions';
import { AppFile } from '~features/file/models';
import { selectFilesArrayForCurrentTarget } from '~store/selectors/target/target.selector';
import { AutoUnsub } from '~utils';
import { Observable } from 'rxjs/Observable';

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
		this.files$ = this.store.select(selectFilesArrayForCurrentTarget);
	}

	deleteFile(file: AppFile) {
		this.store.dispatch(FileTargetActions.remove(file));
	}

	onFileAdded(files: Array<File>) {
		files.forEach(file => {
			const appFile = new AppFile(file, this.userSrv.userId);
			this.store.dispatch(FileTargetActions.add(appFile));
		});
	}

	download(file: AppFile) {
		this.store.dispatch(FileTargetActions.download(file));
	}
}
