import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'double-thumbs-app',
	templateUrl: './double-thumbs.component.html',
	styleUrls: ['./double-thumbs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoubleThumbsComponent implements OnInit {

	@Input() size = 's';
	// if we only have 1 thumb or 2
	@Input() single: true | false = false;
	// we can have 2 status for each thumb
	// both status can be false at the same time, but they can't be true at the same time
	@Input() like = false;
	@Input() dislike = false;
	// we notify the future status since it can be false or true for each thumb
	@Output() onLike = new EventEmitter<boolean>();
	@Output() onDislike = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
	}

	get orientationSingle() {
		return this.dislike ? 'down' : 'up';
	}

	get colorSingle() {
		return this.dislike ? 'color-warn' : this.like ? 'color-success' : '';
	}

	singleClick() {
		if (!this.like && !this.dislike) {
			this.thumbUp();
		} else {
			this.like ? this.thumbDown() : this.thumbUp();
		}
	}

	thumbUp() {
		if (this.like) {
			this.like = false;
		} else {
			this.like = true;
			if (this.dislike) { // since both can't be true we have to check
				this.dislike = false;
				this.onDislike.emit(this.dislike);
			}
		}
		this.onLike.emit(this.like);
	}

	thumbDown() {
		if (this.dislike) {
			this.dislike = false;
		} else {
			this.dislike = true;
			if (this.like) { // since both can't be true we have to check
				this.like = false;
				this.onLike.emit(this.like);
			}
		}
		this.onDislike.emit(this.dislike);
	}

}
