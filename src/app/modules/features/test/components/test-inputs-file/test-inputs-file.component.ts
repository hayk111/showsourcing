import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../../../../store/selectors/user.selector';
import { map } from 'rxjs/operators';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { getFirstProductEntityTarget } from '../../utils.utils';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { AppFile } from '../../../../store/model/app-file.model';

@Component({
	selector: 'app-test-inputs-file',
	templateUrl: './test-inputs-file.component.html',
	styleUrls: ['./test-inputs-file.component.scss']
})
export class TestInputsFileComponent extends AutoUnsub implements OnInit {

	event: any;
	files1 = [];
	userId: string;
	target: EntityTarget;
	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.select(selectUser).pipe(
			map(u => u.id)
		).subscribe(id => this.userId = id);

		getFirstProductEntityTarget(this.store, this._destroy$).subscribe(target => this.target = target);
	}

	onFileDrop(files) {
		this.event = `There has been ${files.length} file dropped`;
	}

	onFileSelect(files) {
		this.event = `There has been ${files.length} file selected`;
	}

	onFilesAdded(files) {
		files.forEach(file => {
			this.files1.push(new AppFile(file, this.target, this.userId));
		});
	}

}
