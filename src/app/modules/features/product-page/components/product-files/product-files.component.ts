import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '@utils/index';
import { entityRepresentationMap, EntityTarget } from '../../../../store/utils/entities.utils';
import { ActivatedRoute } from '@angular/router';
import { FileTargetActions } from '../../../../store/action/target/file.action';
import { selectFilesForCurrentTarget, selectFilesArrayForCurrentTarget } from '../../../../store/selectors/target/target.selector';
import { UserService } from '../../../../shared/user/services/user.service';

@Component({
	selector: 'app-product-files',
	templateUrl: './product-files.component.html',
	styleUrls: ['./product-files.component.scss']
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
