import { ChangeDetectionStrategy, Component, ContentChild, OnInit, Input } from '@angular/core';
import { InputDirective } from '~shared/inputs';

import { animation } from './search-bar-animated.animation';

@Component({
	selector: 'search-bar-animated-app',
	templateUrl: './search-bar-animated.component.html',
	styleUrls: ['./search-bar-animated.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: animation,
	host: {
		'[class.expanded]': 'searchState == "expanded"',
		'[class.shrinked]': 'searchState == "shrinked"'
	}
})
export class SearchBarAnimatedComponent implements OnInit {
	@ContentChild(InputDirective) input: InputDirective;
	@Input() animated = true;
	@Input() hasBorder = true;
	searchstate: 'expanded' | 'shrinked';

	constructor() { }

	ngOnInit() {
		this.searchstate = (this.animated ? 'shrinked' : 'expanded');

		if (!this.input) {
			throw Error('You must pass an inputApp via transclusion to the search bar animated component');
		}
	}

	toggleSearch() {
		if (this.searchstate === 'expanded')
			this.shrinkSearch();
		else
			this.expandSearch();
	}

	expandSearch() {
		if (!this.animated)
			return;
		this.searchstate = (this.searchstate === 'expanded' ? 'shrinked' : 'expanded');
		if (this.searchstate === 'expanded' && this.input) {
			this.input.focus();
		}
	}

	shrinkSearch() {
		if (!this.animated)
			return;
		this.searchstate = 'shrinked';
	}

}
