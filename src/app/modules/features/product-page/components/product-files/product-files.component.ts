import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { entityRepresentationMap, EntityTarget } from '../../../../store/utils/entities.utils';
import { ActivatedRoute } from '@angular/router';
import { FileSlctnActions } from '../../../../store/action/selection/file-selection.action';
import { selectFilesForSelection, selectFilesArrayForSelection } from '../../../../store/selectors/selection/selection.selector';
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
		this.files$ = this.store.select(selectFilesArrayForSelection);
	}

	deleteFile(file: AppFile) {
		this.store.dispatch(FileSlctnActions.remove(file));
	}

	onFileAdded(files: Array<File>) {
		files.forEach(file => {
			const appFile = new AppFile(file, this.userSrv.getUserId());
			this.store.dispatch(FileSlctnActions.add(appFile));
		});
	}

	download(file: AppFile) {
		this.store.dispatch(FileSlctnActions.download(file));
	}

}
