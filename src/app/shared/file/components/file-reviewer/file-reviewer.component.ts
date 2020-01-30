import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Attachment } from '~core/erm';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'file-reviewer-app',
	templateUrl: './file-reviewer.component.html',
	styleUrls: ['./file-reviewer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileReviewerComponent extends TrackingComponent {

	@Input() files: Attachment[];
	@Input() selection = new Map<string, Attachment>();
	@Output() selected = new EventEmitter<Attachment>();
	@Output() unselected = new EventEmitter<Attachment>();

	constructor() { super(); }

}
