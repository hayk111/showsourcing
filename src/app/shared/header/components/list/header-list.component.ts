import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ElementRef, QueryList, ContentChildren } from '@angular/core';

@Component({
	selector: 'header-list-app',
	templateUrl: './header-list.component.html',
	styleUrls: ['./header-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flexVAlign flexBetween'
	}
})
export class HeaderListComponent {
	/** what appears in the button on the right for adding an entity */
	@Input() buttonName: string;
	/** specify if the icon should be displayed or not for the adding button */
	@Input() buttonIcon = true;
	/** when said button is clicked */
	@Output() buttonClick = new EventEmitter<any>();
	/** title of the bread crumb */
	@Input() title: string;
	/** whether the button on the right is displayed */
	@Input() hasAction = true;
	// Can update title or not
	@Input() isModifiable = false;
	@Input() info: string;
	@Input() logoName: string;
	@Output() update = new EventEmitter<string>();
}
