import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { AppFile } from '../../../../store/model/app-file.model';
import { EntityTarget } from '../../../../store/utils/entities.utils';
import { selectFilesForTarget } from '../../../../store/selectors/file.selector';
import { FileActions } from '../../../../store/action/file.action';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
	selector: 'input-file-app',
	templateUrl: './input-file.component.html',
	styleUrls: ['./input-file.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFileComponent implements OnInit {
	@Input() files: Array<AppFile>;
	@Output() filesAdded = new EventEmitter<Array<File>>();

	constructor() { }

	ngOnInit() {
	}

}
