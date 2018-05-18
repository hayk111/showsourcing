import { ChangeDetectionStrategy, Component, ContentChild, OnInit } from '@angular/core';
import { InputDirective } from '~shared/inputs';

import { animation } from './search-bar-animated.animation';

@Component({
	selector: 'search-bar-animated-app',
	templateUrl: './search-bar-animated.component.html',
	styleUrls: ['./search-bar-animated.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: animation,
})
export class SearchBarAnimatedComponent implements OnInit {
	@ContentChild(InputDirective) input: InputDirective;
	// applies a border when expanded
	get border() { return this.searchstate === 'expanded'; }
	searchstate: 'expanded' | 'shrinked' = 'shrinked';

	constructor() { }

	ngOnInit() {
		if (!this.input) {
			throw Error('You must pass an inputApp via transclusion to the search bar animated component');
		}
	}

	expandSearch() {
		this.searchstate = this.searchstate === 'expanded' ? 'shrinked' : 'expanded';
		if (this.searchstate === 'expanded' && this.input) {
			this.input.focus();
		}
	}

	shrinkSearch() {
		this.searchstate = 'shrinked';
	}

}
