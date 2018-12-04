import { Input, Output, Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from '~models';

export enum FileType {
	file = 'File',
	image = 'IMAGE',
}

@Component({
	selector: 'file-row-app',
	templateUrl: './file-row.component.html',
	styleUrls: ['./file-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileRowComponent implements OnInit {

	@Input() fileType = FileType.file;
	@Input() file?: Attachment;
	@Input() isPending = false;
	@Output() onDelete = new EventEmitter<Attachment>();

	constructor(private router: Router) { }

	ngOnInit() {
	}

	public onDeleteFunc() {
		this.onDelete.emit(this.file);
	}
}
