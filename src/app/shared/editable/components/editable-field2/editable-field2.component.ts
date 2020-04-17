import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { EditableContainerComponent } from '../editable-container/editable-container.component';

@Component({
	selector: 'editable-field2-app',
	templateUrl: './editable-field2.component.html',
	styleUrls: ['./editable-field2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.open]': 'isOpen'
	}
})
export class EditableField2Component extends EditableContainerComponent {


}
