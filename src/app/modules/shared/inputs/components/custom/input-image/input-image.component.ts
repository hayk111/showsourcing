// import { Component, OnInit, forwardRef, Injector, Output, EventEmitter, Input } from '@angular/core';
// import { FileUploaderService } from '../../../uploader/services/file-uploader.service';
// import { NG_VALUE_ACCESSOR } from '@angular/forms';
// import { AbstractInput } from '../../abstract-input.class';
// import { FileItem } from 'ng2-file-upload';
// import { EntityRepresentation } from '../../../../store/model/filter.model';
// import { deepCopy } from '../../../../store/utils/deep-copy.utils';

// @Component({
// 	selector: 'input-image-app',
// 	templateUrl: './input-image.component.html',
// 	styleUrls: ['./input-image.component.scss'],
// 	providers: [
// 		FileUploaderService,
// 		{
// 			provide: NG_VALUE_ACCESSOR,
// 			useExisting: forwardRef(() => InputImageComponent),
// 			multi: true
// 		}
// 	]
// })
// export class InputImageComponent implements OnInit {
// 	@Input() images: Array<any>;
// 	@Output() imgAdded = new EventEmitter();
// 	@Output() imgUploaded = new EventEmitter();

// 	constructor(public uploader: FileUploaderService) {
// 	}

// 	ngOnInit() {
// 		this.uploader.onAfterAddingFile = this.onImageUploadStart(this);
// 		this.uploader.onSuccessItem = this.onImageUploadEnd(this);
// 	}

// 	@Input()
// 	set entityId(v: string) {
// 		this.uploader.entityId = v;
// 	}

// 	@Input()
// 	set entityRepr(repr: EntityRepresentation){
// 		this.uploader.entityRepr = repr;
// 	}

// 	@Input()
// 	set autoLinkImage(b: boolean) {
// 		this.uploader.autoLinkImage = b;
// 	}

// 	onImageUploadStart(self) {
// 		return (fileItem) => {
// 			const reader = new FileReader();

// 			reader.onloadend = function (e) {
// 				// placeholder until image is ready
// 				self.imgAdded.emit( { id: fileItem.id, data: reader.result, pending: true });
// 			};
// 			reader.readAsDataURL(fileItem._file);
// 		};
// 	}

// 	onImageUploadEnd(self) {
// 		return (fileItem) => {
// 			self.imgUploaded.emit(fileItem);
// 		};
// 	}

// }
