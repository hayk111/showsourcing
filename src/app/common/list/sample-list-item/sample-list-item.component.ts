import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Sample } from '~core/orm/models';

import { AbstractListItemComponent } from '../abstract-list-item.component';

@Component({
	selector: 'sample-list-item-app',
	templateUrl: './sample-list-item.component.html',
	styleUrls: ['./sample-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListItemComponent extends AbstractListItemComponent<Sample> {
	@Input() sample: Sample;

	constructor(public translate: TranslateService) { super(); }

}
