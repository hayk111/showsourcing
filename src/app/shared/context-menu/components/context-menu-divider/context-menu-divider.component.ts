import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

/** Same as divider.component but with special margins */
@Component({
	selector: 'context-menu-divider-app',
	templateUrl: './context-menu-divider.component.html',
	styleUrls: ['./context-menu-divider.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuDividerComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
