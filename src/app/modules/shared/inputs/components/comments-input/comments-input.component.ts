import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppComment } from '../../../../store/model/comment.model';
import { Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'comments-input-app',
	templateUrl: './comments-input.component.html',
	styleUrls: ['./comments-input.component.scss']
})
export class CommentsInputComponent implements OnInit {
	@Input() comments: Array<AppComment>;
	@Output() newComment = new EventEmitter<string>();
	ctrl = new FormControl('', Validators.required);

	constructor() { }

	ngOnInit() {
	}

	onEnter() {
		if (this.ctrl.valid)
			this.newComment.emit(this.ctrl.value);
		this.ctrl.reset();
	}

}
