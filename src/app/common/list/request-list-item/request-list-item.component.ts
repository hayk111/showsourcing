import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupplierRequest } from '~core/erm/models';

import { AbstractListItemComponent } from '../abstract-list-item.component';

@Component({
	selector: 'request-list-item-app',
	templateUrl: './request-list-item.component.html',
	styleUrls: ['./request-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestListItemComponent extends AbstractListItemComponent<SupplierRequest> {
	@Input() request: SupplierRequest;

	constructor(public translate: TranslateService) { super(); }

}
