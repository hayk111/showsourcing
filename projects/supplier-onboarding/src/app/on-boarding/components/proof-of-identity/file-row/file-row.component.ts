import { Input, Output, Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from '~models';

export enum FileType {
  image = 'IMAGE',
  file = 'File',
}


@Component({
	selector: 'file-row-app',
	templateUrl: './file-row.component.html',
	styleUrls: ['./file-row.component.scss', './../../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileRowComponent implements OnInit {
	@Input() fileType = FileType.file;
	@Input() file?: Attachment;

	@Output() onDelete = new EventEmitter<Attachment>();

	constructor(private router: Router) { }

	ngOnInit() {
	}

	public onDeleteFunc() {
		if( this.onDelete ) {
			this.onDelete.emit(this.file);
		}
	}
}
