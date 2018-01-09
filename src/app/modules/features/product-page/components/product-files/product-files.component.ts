import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppFile } from '../../../../store/model/app-file.model';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { entityRepresentationMap, EntityTarget } from '../../../../store/utils/entities.utils';
import { FileActions } from '../../../../store/action/file.action';
import { ActivatedRoute } from '@angular/router';
import { selectFilesForTarget } from '../../../../store/selectors/target/file.selector';

@Component({
	selector: 'app-product-files',
	templateUrl: './product-files.component.html',
	styleUrls: ['./product-files.component.scss']
})
export class ProductFilesComponent extends AutoUnsub implements OnInit {
	files$: Observable<AppFile>;
	target: EntityTarget;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.route.parent.params.takeUntil(this._destroy$)
		.subscribe(params => {
			this.target = { entityId: params['id'], entityRepr: entityRepresentationMap.product };
			this.store.dispatch(FileActions.load(this.target));
			this.files$ = this.store.select(selectFilesForTarget(this.target));
		});
	}

	deleteFile(file: AppFile) {
		this.store.dispatch(FileActions.remove(file));
	}

	onFileAdded(files: Array<File>) {
		files.forEach(file => {
			const appFile = new AppFile(file, this.target, this.store);
			this.store.dispatch(FileActions.addNew(appFile));
		});

	}

	download(file: AppFile) {
		this.store.dispatch(FileActions.download(file));
	}

}
