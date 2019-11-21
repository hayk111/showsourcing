import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnConfig } from '../entity-table.component';
import { EntityMetadata } from '~core/models';


export interface EditableEntity {
	id: string;
	status?: any;
	assignee?: any;
	favorite?: boolean;
}

@Component({
	selector: 'default-columns-app',
	templateUrl: './default-columns.component.html',
	styleUrls: [
		'./default-columns.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultColumnsComponent {
	@Input() row: any;
	@Input() column: ColumnConfig;
	@Input() type: EntityMetadata;
	@Input() hovered: boolean;
	@Output() update = new EventEmitter<EditableEntity>();
	@Output() previewClick = new EventEmitter<any>();

	constructor(public translate: TranslateService) {}
}
