import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnConfig } from '../entity-table.component';
import { EntityMetadata } from '~core/models';
import { Color } from '~utils/colors.enum';
import { Router } from '@angular/router';


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
	@Input() logoColor: Color;
	@Input() redirectOnNameClick = true;
	@Output() update = new EventEmitter<EditableEntity>();
	@Output() previewClick = new EventEmitter<any>();
	@Output() logoClick = new EventEmitter<any>();
	@Output() nameClick = new EventEmitter<any>();

	constructor(public translate: TranslateService, private router: Router) {}

	onLogoClick(row: any) {
		this.logoClick.emit(row);
	}

	onNameClick(row: any) {
		if (this.redirectOnNameClick)
			this.router.navigate(['/', this.type.destUrl, this.row.id]);
		else
			this.nameClick.emit(row);
	}
}
