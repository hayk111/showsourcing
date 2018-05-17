import { Directive, HostListener, Output, HostBinding, EventEmitter } from '@angular/core';
import { AppFile } from '~models';



@Directive({
	selector: `[fileSelect]`
})
export class FileSelectDirective {
	@Output() fileSelect = new EventEmitter<Array<AppFile>>();


	@HostListener('change', ['$event'])
	onFileDrop(event) {
		event.preventDefault();
		const files = [];
		const fileList = event.target.files;
		if (fileList) {
			for (let i = 0; i < fileList.length; i++) {
				files.push(fileList[i]);
			}
		}
		this.fileSelect.emit(files);
	}
}

