import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/entities/user.selector';
import { map, tap } from 'rxjs/operators';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { getFirstProductEntityTarget } from '../../utils.utils';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { AppFile } from '../../../../store/model/entities/app-file.model';
import { AppImage } from '../../../../store/model/entities/app-image.model';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../../shared/user/services/user.service';
import { SelectionAction } from '../../../../store/action/selection/selection.action';

@Component({
	selector: 'app-test-inputs-file',
	templateUrl: './test-inputs-file.component.html',
	styleUrls: ['./test-inputs-file.component.scss']
})
export class TestInputsFileComponent extends AutoUnsub implements OnInit {

	dropEvent: any;
	selectEvent: any;
	files1 = [];
	files2 = [];
	userId: string;
	target$: Observable<EntityTarget>;
	target: EntityTarget;

	constructor(private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		getFirstProductEntityTarget(this.store, this._destroy$).pipe(
			tap(target => this.store.dispatch(SelectionAction.select(target)))
		);
	}

	onFileDrop(files) {
		this.dropEvent = `There has been ${files.length} file dropped`;
	}

	onFileSelect(files) {
		this.selectEvent = `There has been ${files.length} file selected`;
	}

	onFileAdded(file, where) {
		this[where].push(new AppFile(file, this.userSrv.getUserId()));
	}

	async onImgAdded(file, where) {
		const img = await AppImage.newInstance(file, this.userSrv.getUserId());
		this[where].push(img);
	}

}
