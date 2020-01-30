import { Directive, HostListener, Output, HostBinding, EventEmitter } from '@angular/core';
import { Attachment } from '~core/orm/models';



@Directive({
	selector: `[fileSelect]`
})
export class FileSelectDirective {
	@Output() fileSelect = new EventEmitter<Array<Attachment>>();


	@HostListener('change', ['$event'])
	onFileDrop(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		const files = [];
		const fileList = (event.target as HTMLInputElement).files;
		if (fileList) {
			for (let i = 0; i < fileList.length; i++) {
				files.push(fileList[i]);
			}
		}
		this.fileSelect.emit(files);
	}
}

