import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { Attachment } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'files-page-app',
	templateUrl: './files-page.component.html',
	styleUrls: ['./files-page.component.scss'],
})
export class FilesPageComponent extends AutoUnsub implements OnInit {
	files$: Observable<Array<Attachment>>;

	constructor(private route: ActivatedRoute) {
		super();
	}

	ngOnInit() {
		// this.files$ = this.store.select(fromFile.selectArray);
	}

	deleteFile(file: Attachment) {
		// this.store.dispatch(fromFile.Actions.delete([file.id]));
	}

	onFileAdded(files: Array<File>) {
		// const appFiles = files.map(file => new AppFile(file, this.userSrv.userId));
		// this.store.dispatch(fromFile.Actions.add(appFiles));
	}

	download(file: Attachment) {
		// this.store.dispatch(fromFile.Actions.download(file.url || file.data));
	}
}
