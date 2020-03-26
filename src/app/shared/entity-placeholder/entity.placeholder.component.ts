import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Typename } from '~core/erm3/typename.type';

@Component({
	selector: 'entity-placeholder-app',
	templateUrl: './entity-placeholder.component.html',
	styleUrls: ['./entity-placeholder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityPlaceholderComponent {

	@Input() typename: Typename;
	@Input() title: string;
	@Input() subtitle: string;

}
