import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppFile, fromFile } from '~entity';
import { AutoUnsub } from '~utils';
import { UserService } from '~app/features/user';

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
		this.files$ = this.store.select(fromFile.selectArray);
	}

	deleteFile(file: AppFile) {
		this.store.dispatch(fromFile.Actions.delete([file.id]));
	}

	onFileAdded(files: Array<File>) {
		const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		this.store.dispatch(fromFile.Actions.add(appFiles));
	}

	download(file: AppFile) {
		this.store.dispatch(fromFile.Actions.download(file.url || file.data));
	}
}
