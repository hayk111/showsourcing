import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from '@shared/user/services/user.service';
import { FileTargetActions } from '@store/action/target/file.action';
import { AppFile } from '@store/model/entities/app-file.model';
import { selectFilesArrayForCurrentTarget } from '@store/selectors/target/target.selector';
import { AutoUnsub } from '@utils';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app-product-files',
	templateUrl: './product-files.component.html',
	styleUrls: ['./product-files.component.scss'],
})
export class ProductFilesComponent extends AutoUnsub implements OnInit {
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
			const appFile = new AppFile(file, this.userSrv.getUserId());
			this.store.dispatch(FileTargetActions.add(appFile));
		});
	}

	download(file: AppFile) {
		this.store.dispatch(FileTargetActions.download(file));
	}
}
