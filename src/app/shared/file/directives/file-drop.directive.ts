import { Directive, EventEmitter, HostListener, Output } from '@angular/core';



@Directive({
	selector: `[fileDrop]`
})
export class FileDropDirective {
	@Output() fileDrop = new EventEmitter<Array<File>>();

	// this is needed so the page doesn't switch to a file tab when we drop
	@HostListener('dragover', ['$event'])
	onDragOver(event) {
		event.preventDefault();
	}

	@HostListener('drop', ['$event'])
	onFileDrop(event) {
		// If dropped items aren't files, reject them
		event.preventDefault();
		const dt = event.dataTransfer;
		let files = [];
		// when drag and droping an image from the page only dataTransfer.item is set, not dataTransfer.files
		if (dt.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (let i = 0; i < dt.items.length; i++) {
				if (dt.items[i].kind === 'file') {
					const f = dt.items[i].getAsFile();
					files.push(f);
				}
			}
		} else {
			files = dt.files;
		}
		event.preventDefault();
		if (files.length > 0) {
			this.fileDrop.emit(files);
		}
	}

}
