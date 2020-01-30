import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { EntityName } from '~core/ORM/models';

@Component({
	selector: 'entity-placeholder-app',
	templateUrl: './entity-placeholder.component.html',
	styleUrls: ['./entity-placeholder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityPlaceholderComponent {

	@Input() type: EntityName;
	@Input() title: string;
	@Input() subtitle: string;

}
