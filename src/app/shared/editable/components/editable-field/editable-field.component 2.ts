import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditableContainerComponent } from '../editable-container/editable-container.component';

@Component({
	selector: 'editable-field-app',
	templateUrl: './editable-field.component.html',
	styleUrls: ['./editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableFieldComponent extends EditableContainerComponent {
}
