import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RequestElement } from '~core/orm/models';
import { AbstractListItemComponent } from '../abstract-list-item.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'request-element-list-item-app',
	templateUrl: './request-element-list-item.component.html',
	styleUrls: ['./request-element-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestElementListItemComponent extends AbstractListItemComponent<RequestElement> {
	@Input() requestElement: RequestElement;

	constructor(public translate: TranslateService) { super(); }
}
