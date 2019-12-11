import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RequestElement } from '~core/models';

@Component({
	selector: 'request-element-list-item-app',
	templateUrl: './request-element-list-item.component.html',
	styleUrls: ['./request-element-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementListItemComponent {
	@Input() requestElement: RequestElement;
}
