import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnConfig } from '../entity-table.component';
import { EntityMetadata, ERM } from '~core/erm';
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
	@Input() type: EntityMetadata; // TODO change type by typename
	@Input() hovered: boolean;
	@Input() logoColor: Color;
	@Input() redirectOnNameClick = true;
	@Output() update = new EventEmitter<EditableEntity>();
	@Output() previewClick = new EventEmitter<any>();
	@Output() logoClick = new EventEmitter<any>();
	@Output() nameClick = new EventEmitter<any>();
	erm = ERM;

	constructor(
		public translate: TranslateService,
		private router: Router
	) { }

	onLogoClick(row: any) {
		this.logoClick.emit(row);
	}

	routerPath(row) {
		if (this.redirectOnNameClick)
			return (['/', this.type.destUrl, row.id]);
	}

	nameClicked(row) {
		if (this.redirectOnNameClick)
			return;

		this.nameClick.emit(row);
	}

}
