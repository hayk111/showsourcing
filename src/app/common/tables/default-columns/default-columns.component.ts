import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnConfig } from '../entity-table.component';
import { Color } from '~utils/colors.enum';
import { Router } from '@angular/router';
import { Typename } from '~core/erm3/typename.type';
import { Product, WorkflowStatus } from '~core/erm3';

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
	@Input() typename: Typename;
	@Input() hovered: boolean;
	@Input() logoColor: Color;
	@Input() redirectOnNameClick = true;
	@Output() update = new EventEmitter<EditableEntity>();
	@Output() updateDueDate = new EventEmitter<any>();
	@Output() previewClick = new EventEmitter<any>();
	@Output() logoClick = new EventEmitter<any>();
	@Output() nameClick = new EventEmitter<any>();

	constructor(
		public translate: TranslateService,
		private router: Router
	) { }

	onLogoClick(row: any) {
		this.logoClick.emit(row);
	}

	routerPath(row) {
		// if (this.redirectOnNameClick)
		// 	return (['/', this._getTypenameUrl(this.typename), row.id]);
	}

	_getTypenameUrl(typename) {
		switch (typename) {
			default:
				return typename.toLowerCase() + 's';
		}
	}

	nameClicked(row) {
		// if (this.redirectOnNameClick)
		// 	return;

		this.nameClick.emit(row);
	}

	onUpdateDueDate(entity: any, dueDate: Date) {
		this.updateDueDate.emit({ entity, dueDate: new Date(dueDate).toISOString() });
	}

	// updateProduct(entityId: string, productId: string) {
	// 	this.update.emit({ id: entityId, [this.typename.toLowerCase() + 'ProductId']: productId });
	// }

}
