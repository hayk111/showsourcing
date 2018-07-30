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
	@Input() liked = false;
	@Input() disliked = false;
	// we notify the future status since it can be false or true for each thumb
	@Output() onLike = new EventEmitter<boolean>();
	@Output() onDislike = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
	}

	get orientationSingle() {
		return this.disliked ? 'down' : 'up';
	}

	get colorSingle() {
		return this.disliked ? 'color-warn' : this.liked ? 'color-success' : '';
	}

	singleClick() {
		if (!this.liked && !this.disliked) {
			this.thumbUp();
		} else {
			this.liked ? this.thumbDown() : this.thumbUp();
		}
	}

	thumbUp() {
		if (this.liked) {
			this.liked = false;
		} else {
			this.liked = true;
			if (this.disliked) { // since both can't be true we have to check
				this.disliked = false;
				this.onDislike.emit(this.disliked);
			}
		}
		this.onLike.emit(this.liked);
	}

	thumbDown() {
		if (this.disliked) {
			this.disliked = false;
		} else {
			this.disliked = true;
			if (this.liked) { // since both can't be true we have to check
				this.liked = false;
				this.onLike.emit(this.liked);
			}
		}
		this.onDislike.emit(this.disliked);
	}

}
