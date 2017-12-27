// import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs/Observable';
// import { AppFile } from '../../../../store/model/app-file.model';
// import { EntityTarget } from '../../../../store/utils/entities.utils';
// import { selectImagesForTarget } from '../../../../store/selectors/image.selector';
// import { ImageActions } from '../../../../store/action/images.action';
// import { AppErrorActions } from '../../../../store/action/app-errors.action';

// @Component({
// 	selector: 'img-input-app',
// 	templateUrl: './img-input.component.html',
// 	styleUrls: ['./img-input.component.scss']
// })
// export class ImgInputComponent implements OnInit {
// 	images$: Observable<Array<AppFile>>;
// 	private _target: EntityTarget;
// 	// @Input at the bottom

// 	constructor(private store: Store<any>) { }


// 	ngOnInit() {
// 		this.images$ = this.store.select<any>(selectImagesForTarget(this.target));
// 	}

// 	onFileChange(files: Array<File>) {
// 		files.forEach(file => {
// 			if (file.type.split('/')[0] === 'image') {
// 				const appFile: AppFile = { file, target: this.target };
// 				this.store.dispatch(ImageActions.addNew(appFile));
// 			} else {
// 				this.store.dispatch(AppErrorActions.add('An image is needed here'));
// 			}
// 		});
// 	}

// 	@Input()
// 	set target(target: EntityTarget) {
// 		this.store.dispatch(ImageActions.load(target));
// 		this._target = target;
// 	}

// 	get target() {
// 		return this._target;
// 	}

// }
