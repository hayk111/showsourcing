import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ElementRef, QueryList, ContentChildren } from '@angular/core';

@Component({
	selector: 'top-panel-app',
	templateUrl: './top-panel.component.html',
	styleUrls: ['./top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-6 flexVAlign flexBetween'
	}
})
export class TopPanelComponent {
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
	@Output() update = new EventEmitter<string>();
}
